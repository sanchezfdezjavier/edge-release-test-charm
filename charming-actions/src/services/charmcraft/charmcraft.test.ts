// import * as exec from '@actions/exec';
import { Charmcraft } from '.';
import * as exec from '@actions/exec';

describe('the charmcraft service', () => {
  describe('the check for drifting libs', () => {
    [
      {
        text: 'updated to version',
        expected: false,
      },
      {
        text: 'not found in Charmhub',
        expected: false,
      },
      {
        text: 'has local changes',
        expected: false,
      },
      {
        text: 'is ok',
        expected: true,
      },
    ].forEach(({ text, expected }) => {
      it(`should detect when lib ${text}`, async () => {
        const charmcraft = new Charmcraft('token');
        charmcraft.metadata = () => ({ name: 'hello', images: [] });
        jest
          .spyOn(exec, 'getExecOutput')
          .mockResolvedValue({ exitCode: 0, stderr: text, stdout: '' });
        const status = await charmcraft.hasDriftingLibs();
        expect(status.ok).toEqual(expected);
      });
    });
  });
});

describe('check for uploadResources', () => {
  [
    {
      flags: ['edge-release-test-charm-image:17'],
      resourceInfo: 'resources:\n',
      images: [
        [
          'edge-release-test-charm-image',
          'docker.artifactory.magmacore.org/controller:latest',
        ],
      ],
    },
    {
      flags: ['lollercopter-image:1', 'bueno-image:4'],
      resourceInfo: 'resources:\n',
      images: [
        [
          'lollercopter-image',
          'docker.artifactory.magmacore.org/controller:latest',
        ],
        ['bueno-image', 'docker.artifactory.magmacore.org/controller:latest'],
      ],
    },
  ].forEach(({ flags, resourceInfo, images }) => {
    it(`should return the right flags and resource info`, async () => {
      const charmcraft = new Charmcraft('token');

      charmcraft.uploadResource = jest.fn();
      charmcraft.metadata = jest.fn(() => ({
        name: 'hello',
        images,
      }));

      charmcraft.buildResourceFlag = jest.fn(
        async (_name, resource_name, _resource_image) => {
          return {
            flag: `${flags.find((f) => f.includes(resource_name))}`,
            info: ``,
          };
        }
      );

      const uploadResources = await charmcraft.uploadResources();
      expect(uploadResources).toEqual({ flags, resourceInfo });
    });
  });
});
