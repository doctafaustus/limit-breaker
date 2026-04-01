import { useNavigate } from 'react-router-dom';
import styles from './Privacy.module.scss';

const LAST_UPDATED = 'April 1, 2026';
const CONTACT_EMAIL = 'limitbreaker.app@gmail.com';

export default function Privacy() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <button className={styles.back} onClick={() => navigate(-1)}>
          ← Back
        </button>
        <h1 className={styles.title}>Privacy Policy</h1>
        <p className={styles.updated}>Last updated: {LAST_UPDATED}</p>

        <section className={styles.section}>
          <p>
            Limit Breaker ("we", "our", or "us") operates this application. This
            policy explains what information we collect, how we use it, and your
            rights. By using the app, you agree to this policy.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>What We Collect</h2>
          <ul className={styles.list}>
            <li>
              <strong>Email address</strong> — collected when you sign in via
              magic link. Used solely to authenticate you.
            </li>
            <li>
              <strong>Usage data</strong> — lesson completions, streaks, and
              date offsets stored to track your progress.
            </li>
            <li>
              <strong>Reflections</strong> — optional text you write during
              lessons. Stored so you can revisit them.
            </li>
          </ul>
          <p>
            We do not collect payment information, location data, or any
            sensitive personal information.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>How We Use It</h2>
          <ul className={styles.list}>
            <li>To authenticate your account and keep you signed in</li>
            <li>To save and display your lesson progress and reflections</li>
            <li>To calculate your streak and monthly stats</li>
          </ul>
          <p>
            We do not sell your data. We do not use it for advertising. We do
            not share it with third parties except as described below.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>Third-Party Services</h2>
          <ul className={styles.list}>
            <li>
              <strong>Stytch</strong> — handles authentication and stores your
              email address. Subject to Stytch's own privacy policy.
            </li>
            <li>
              <strong>MongoDB Atlas</strong> — cloud database where your
              progress data is stored. Hosted on secure infrastructure.
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>Data Retention</h2>
          <p>
            Your data is kept as long as your account is active. You can delete
            your account at any time from the Profile page. Deletion removes
            your data from our database and from Stytch.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>Security</h2>
          <p>
            We use industry-standard practices to protect your data.
            Authentication is handled by Stytch, which uses passwordless magic
            links. We do not store passwords.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>Limitation of Liability</h2>
          <p>
            Fat Cattitude, LLC takes reasonable steps to protect your personal
            information using commercially acceptable security measures. However,
            no method of transmission over the internet or electronic storage is
            completely secure. We cannot guarantee absolute security and are not
            liable for unauthorized access, disclosure, alteration, or
            destruction of your data resulting from circumstances beyond our
            reasonable control.
          </p>
          <p>
            To the fullest extent permitted by applicable law, Fat Cattitude,
            LLC shall not be liable for any indirect, incidental, special, or
            consequential damages arising out of or related to your use of this
            application or any data security incident.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>Ownership</h2>
          <p>
            Limit Breaker is owned and operated by Fat Cattitude, LLC. All
            rights reserved.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>Children</h2>
          <p>
            This app is not directed at children under 13. If you believe a
            child has provided us with personal information, please contact us
            and we will delete it promptly.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>Changes</h2>
          <p>
            We may update this policy from time to time. We will update the date
            at the top of this page. Continued use of the app after changes
            means you accept the updated policy.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>Contact</h2>
          <p>
            Questions? Email us at{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className={styles.link}>
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
