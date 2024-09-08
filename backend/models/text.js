import { log } from 'console';
import crypto from 'crypto';

function getResetPasswordToken() {
  const resetToken = crypto.randomBytes(20).toString('hex'); //key
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  const resetPasswordExpire = Date.now() * 15 * 60 * 1000;
  return { resetToken };
}

console.log(getResetPasswordToken());
