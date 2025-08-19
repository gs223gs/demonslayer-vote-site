/**
 * ReCAPTCHA v2のトークンを検証する
 * @param token ReCAPTCHAから取得したトークン
 * @returns 検証結果 (true: human, false: demon)
 */
export async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  
  if (!secretKey) {
    console.error('RECAPTCHA_SECRET_KEY not found in environment variables');
    return false; // シークレットキーがない場合はdemonとして扱う
  }

  if (!token) {
    return false; // トークンがない場合はdemonとして扱う
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
      }),
    });

    if (!response.ok) {
      console.error('ReCAPTCHA API request failed:', response.status);
      return false;
    }

    const data = await response.json();
    

    return data.success === true;
  } catch (error) {
    console.error('Error verifying ReCAPTCHA:', error);
    return false; // エラーの場合はdemonとして扱う
  }
}

/**
 * voter_typeを判定する
 * @param recaptchaToken ReCAPTCHAトークン（nullable）
 * @returns 'human' | 'demon' | 'unknown'
 */
export async function determineVoterType(recaptchaToken: string | null): Promise<'human' | 'demon' | 'unknown'> {
  if (!recaptchaToken) {
    return 'demon'; // ReCAPTCHAトークンがない場合はdemon
  }

  const isHuman = await verifyRecaptcha(recaptchaToken);

  return isHuman ? 'human' : 'demon';
}