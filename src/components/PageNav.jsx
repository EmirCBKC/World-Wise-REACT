import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "./Logo";
import { useAuth } from "../contexts/FakeAuthContext";
import User from "./User";

export default function PageNav() {

    const { user } = useAuth();

    return (
        <>
            <nav className={styles.nav}>
                <Logo />
                <ul>
                    <li>
                        <NavLink to="/product">Product</NavLink>
                    </li>
                    <li>
                        <NavLink to="/pricing">Pricing</NavLink>
                    </li>
                    {user ? <li>
                        <User />
                    </li> :
                        <li>
                            <NavLink to="/login" className={styles.ctaLink}>Login</NavLink>
                        </li>}
                </ul>
            </nav>
        </>
    )
}
