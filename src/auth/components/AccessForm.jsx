import './AccessForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import FormHandler from './FormHandler';
import Logo from '../../student/components/Logo';

export default function AccessForm(props) {
    return (
        <div className="access-form-container">
            <div className="container">
                <div className="left-container">
                    <Logo />

                    <div className='left-container-body'>
                        <span className="form-title">
                            {props.register ? "Access account" : "Create account"}
                        </span>

                        <FormHandler
                            register={props.register}
                        />

                                   
                    <span className="bottom-text">
                        {props.register ?
                            <>Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); props.onNavigateToSignup?.(); }}>Create one</a></>
                            : <>Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); props.onNavigateToLogin?.(); }}>Log in</a></>
                        }
                        <FontAwesomeIcon icon={faRightToBracket} style={{ color: "#0d5c91", fontSize: "14px", paddingLeft: "3px" }} />
                    </span>
                    </div> 
                </div>
                <div className="right-container">
                    <div className="greet-container">
                        <span className="greet-title">
                            Hello, Welcome{props.register && " Back!"}
                        </span>

                        <span className="small-text">
                            {props.register ? "Hey, welcome back to your special place" : "Join to our university community"}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}