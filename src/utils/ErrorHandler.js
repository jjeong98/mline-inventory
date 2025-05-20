export const handleAuthError = (error) => {
  if (error.response?.status === 401) {
    return "인증에 실패했습니다.";
  }
  return "서버 오류가 발생했습니다.";
};
