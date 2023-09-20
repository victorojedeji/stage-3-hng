import { getAuth, fetchSignInMethodsForEmail } from 'firebase/auth';
const auth = getAuth();


async function isEmailInUse(email) {
  try {
    const signInMethods = await fetchSignInMethodsForEmail(auth, email);

    return signInMethods.length > 0;
  } catch (error) {
    console.error('Error checking email existence:', error);
    return false;
  }
}
export default isEmailInUse;
