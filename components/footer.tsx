/* eslint-disable @next/next/no-img-element */
import styles from '../styles/Footer.module.scss';

export default function Footer() {
    return (
        <footer className={styles.footer}>
        <div className={styles.columns}>
            <div className={styles.columnOne}>
                <h5>FAQ</h5>
                <h5>Whats New</h5>
                <h5>Contact Us</h5>
                <h5>+966544206004</h5>
                <h5>Tel: +966138249923</h5>
            </div>
            <div className={styles.columnTwo}>
                <img src="/imgs/Layer 4.png" alt="storeapp" width="200" />
            </div>
            <div className={styles.columnThree}>
                <div className={styles.ccontainer}>
                    <h4>Join our mailing List</h4>
                    <label>Email</label>
                    <input type="email" placeholder="enter you email" required />
                    <button type="submit" >إشترك الأن</button>
                </div>
            </div>
        </div>
        <p>All Rights Reserved 2021</p>
    </footer>
    )
}
