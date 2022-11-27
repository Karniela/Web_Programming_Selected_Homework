const SignIn = () => {
    const { me, setMe, setSignedIn, displayStatus } = useChat();
    const handleLogin = (name) => {
        if (!name)
    displayStatus({
      type: "error",
      msg: "Missing user name",
    });
    else setSignedIn(true);
    }
    return (
    <>
        <AppTitle />
        <LogIn me={me} setName={setMe} onLogin={handleLogin} />
    </>
    );
}