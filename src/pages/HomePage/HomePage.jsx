import styles from './HomePage.module.css'


export default function HomePage() {
  return (
    <>
      <title>Welcome</title>
      <div className={styles.container}>
        <h1 className={styles.title}>
          Contact manager welcome page{' '}
          <span role="img" aria-label="Greeting icon">
            💁‍♀️ 
          </span>
        </h1>
      </div>
    </>
  );
}
