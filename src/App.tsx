import { ChangeEvent,  useState } from 'react'
import { Auth } from './components/Auth';
import background from "./images/background.jpg"
import { ToDoList } from './components/ToDoList';
import { auth } from "./config/firebase";
import { signOut} from "firebase/auth";




function App() {
  const [email, setEmail] = useState<string | null>("")
  const [password, setPassword] = useState<string | null>("");
  const [isLoggedIn,setIsLoggedIn] = useState<boolean>(false)
 
 const signOutFunction = async () => {
   try {
     await signOut(auth);

    
   } catch (error) {
     console.log(error);
   }
 };

  return (
    <main>
      <div className="banner">
        <img src={background} alt="background" />
        <h1>To Do List</h1>
        <button
          className="btn"
          onClick={() => {
            setIsLoggedIn(!isLoggedIn);
            signOutFunction();
          }}
        >
          {isLoggedIn ? "logout" : "todo list"}
        </button>
      </div>
      {/* Sign Up Form */}
      <p></p>
      {!isLoggedIn ? (
        <form className="sign-up-form">
          <input
            type="email"
            placeholder="email"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
          <Auth email={email} password={password}></Auth>
        </form>
      ) : (
        <>
          <ToDoList></ToDoList>
        </>
      )}
    </main>
  );
}

export default App
