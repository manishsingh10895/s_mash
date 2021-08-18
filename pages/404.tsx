import styles from '../styles/Error.module.css';
import Link from 'next/link';

export default function Custom404() {
    return <div className={styles.container}>
        <h1>404 - Page Not Found</h1>

        <div className="button">
            <Link href="/">
                Home
            </Link>
        </div>
    </div>
}