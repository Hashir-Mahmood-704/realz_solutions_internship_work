function getAndSetUserData(navigate, setter, userId) {
    const userLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
    if (!userLoggedIn) navigate("/");
    const usersDataArray = JSON.parse(localStorage.getItem("usersData"));
    if (!usersDataArray || usersDataArray.length < 1) {
        throw new Error(
            "unexpected error, localStorage does not contain usersData array",
        );
    }
    const findUser = usersDataArray.find((item) => item.id === userId);
    if (!findUser) {
        throw new Error("unexpected error, user not found in users data array!");
    }
    setter(findUser);
}

export {getAndSetUserData};
