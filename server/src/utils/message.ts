export const HTTP_STATUS_OK = 'HTTP_STATUS_OK';
export const HTTP_STATUS_CREATED = 'HTTP_STATUS_CREATED';
export const HTTP_STATUS_UPDATED = 'HTTP_STATUS_UPDATED';
export const HTTP_STATUS_DELETED = 'HTTP_STATUS_DELETED';
export const LOGIN_OK = 'LOGIN_OK';

export const systemMessage = {
  // message for auth, start with 100
  'Tài khoản không tồn tại': {
    code: 100,
    message: 'Tài khoản không tồn tại',
  },
  'Tài khoản hoặc email đã tồn tại': {
    code: 101,
    message: 'Tài khoản hoặc email đã tồn tại',
  },
  'Mật khẩu không hợp lệ': {
    code: 102,
    message: 'Mật khẩu không hợp lệ',
  },
  'Mã kích hoạt không hợp lệ': {
    code: 103,
    message: 'Mã kích hoạt không hợp lệ',
  },
  LOGIN_OK: {
    code: '00',
    message: 'Đăng nhập thành công',
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
