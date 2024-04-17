import Header from "@/components/header"
export default function root({ children }) {
    return (
        <>
            <Header />
            {children}
        </>
    );
}