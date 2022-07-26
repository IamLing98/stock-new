export const HTTP_STATUS_OK = 'HTTP_STATUS_OK';
export const HTTP_STATUS_CREATED = 'HTTP_STATUS_CREATED';
export const HTTP_STATUS_UPDATED = 'HTTP_STATUS_UPDATED';
export const HTTP_STATUS_DELETED = 'HTTP_STATUS_DELETED';

export const systemMessage = {
  // message for auth, start with 100
  'Tài khoản không tồn tại': {
    code: 100,
    message: 'Tài khoản không tồn tại',
  },
  HTTP_STATUS_OK: {
    code: '00',
    message: 'Thành công',
  },
  HTTP_STATUS_CREATED: {
    code: '01',
    message: 'Lưu công',
  },
  HTTP_STATUS_UPDATED: {
    code: '02',
    message: 'Cập nhật thành công',
  },
  HTTP_STATUS_DELETED: {
    code: '03',
    message: 'Xoá thành công',
  },
};

export default systemMessage;
