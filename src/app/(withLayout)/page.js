import Facilities from '@/Component/HomeComponents/Facilities/Facilities'
import Features from '@/Component/HomeComponents/Features/Features'
import Hero from '@/Component/HomeComponents/Hero/Hero'
import Statistics from '@/Component/HomeComponents/Statistics/Statistics'

export default function Home() {
  return (
    <div className=''>
      <Hero />
      <Statistics />
      <Features />
      <Facilities />
    </div>
  )
}
