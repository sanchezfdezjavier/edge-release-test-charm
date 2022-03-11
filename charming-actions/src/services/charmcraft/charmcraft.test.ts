// import * as exec from '@actions/exec';
import { Charmcraft } from '.';

describe('the charmcraft service', () => {
  // describe('the check for drifting libs', () => {
  //   [
  //     {
  //       text: 'updated to version',
  //       expected: false,
  //     },
  //     {
  //       text: 'not found in Charmhub',
  //       expected: false,
  //     },
  //     {
  //       text: 'has local changes',
  //       expected: false,
  //     },
  //     {
  //       text: 'is ok',
  //       expected: true,
  //     },
  //   ].forEach(({ text, expected }) => {
  //     it(`should detect when lib ${text}`, async () => {
  //       const charmcraft = new Charmcraft('token');
  //       charmcraft.metadata = () => ({ name: 'hello', images: [] });
  //       jest
  //         .spyOn(exec, 'getExecOutput')
  //         .mockResolvedValue({ exitCode: 0, stderr: text, stdout: '' });

  //       const status = await charmcraft.hasD riftingLibs();
  //       expect(status.ok).toEqual(expected);
  //     });
  //   });
  // });

  describe('check for uploadResources', () => {
    [
      {
        flags: ['-test-charm-image:17'],
        resourceInfo: 'resources:\n',
      },
    ].forEach(({ flags, resourceInfo }) => {
      it(`should return the right flags and resource info`, async () => {
        const charmcraft = new Charmcraft('token');
        charmcraft.metadata = () => ({
          name: 'hello',
          images: [['image-naem']],
        });

        const uploadResources = await charmcraft.uploadResources();
        expect(uploadResources).toEqual({ flags, resourceInfo });
      });
    });
  });
});

// test('test_given_charm_and_resource_names_when_upload_resource_called_then_the_right_flag_is_returned', async () => {
//   const charmcraft = new Charmcraft('token');
//   charmcraft.metadata = () => ({
//     name: 'edge-release-test-charm',
//     images: [['edge-release-test-charm-image']],
//   });
//   const uploadResources = await charmcraft.uploadResources();

//   const expectedResult = { flags: [], resourceInfo: '' };
//   expect(uploadResources).toEqual(expectedResult);
// });
