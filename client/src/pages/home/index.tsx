import { useEffect } from "react";
import { useAuthStore } from "../../slices";
import { isEmpty } from "lodash";

function Home() {
    const { user, currentUser, cleanupError } = useAuthStore((state) => state);

    const generateContent = () => {
        let content;

        if (isEmpty(user)) {
            content = "You are not signed in";
        } else {
            content = `Welcome ${user.email}`;
        }

        return <h1>{content}</h1>;
    };

    useEffect(() => {
        currentUser();
        console.log('Hello');
                
        return () => {
            cleanupError();
        };
    }, []);

    return (
        <>
            <h1>Home</h1>
            <div className="card">{generateContent()}</div>
        </>
    );
}

export default Home;
