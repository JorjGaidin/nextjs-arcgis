import styles from '../styles/Home.module.css'
import Plants from '../features/plants/plants'
import { ReactElement } from 'react'
import Layout from '../components/layout'

const Home = () => {
return (
    <div className={styles.container}>
      <Plants/>
    </div>
)
}

Home.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default Home
