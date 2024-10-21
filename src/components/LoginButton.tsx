import {auth} from "../firebase-config";
import {useSignInWithGoogle} from 'react-firebase-hooks/auth';

function LoginButton(){
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);


    return <div className="LoginArea">
        <button onClick={() => signInWithGoogle()}>Sign In</button>
        {(user)? <div>{user.user.displayName}</div> : <div>Not Logged In</div>}
    </div>
}

export default LoginButton;