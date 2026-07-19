export const authMe = (req, res) => {

    try {
        const user = req.user // get user from middleware

        return res.status(200).json({ user: user });
    }
    catch (error) {
        console.error('error when calling authMe', error);
        return res.status(500).json({ message: "System Error" })
    }
}