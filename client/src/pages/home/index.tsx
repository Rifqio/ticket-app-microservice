import { useEffect } from "react";
import { useAuthStore } from "../../slices";
import { isEmpty } from "lodash";
import { Button } from "@/components/ui/button";

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
                
        return () => {
            cleanupError();
        };
    }, []);

    return (
        <>
            <h1 className="text-red-500">Home</h1>
            <div className="card">{generateContent()}</div>
        </>
    );
}

export default Home;
