// Email RegExp
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
// Name RegExp
// 한글은 2 ~ 4글자(공백 없음), 영문은 2 ~ 10글자
const NAME_REGEX = /^[가-힣]{2,4}|[a-zA-Z]{2,10}$/;
// Password RegExp
// 6~20 영문 대소문자, 최소 1개의 숫자 혹은 특수 문자를 포함
const PW_REGEX = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/;

export default { EMAIL_REGEX, NAME_REGEX, PW_REGEX };
