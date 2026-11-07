import { useEffect, useState } from 'react'
import { footer } from '@/config.json'
import { getDiffInDays } from '@/utils/date'

export function RunningDays({ initialDays = 0 }: { initialDays?: number } = {}) {
  // 构建期先算好天数，SSR 直接输出正确文案；水合后再按浏览器当前时间刷新
  const [days, setDays] = useState(initialDays)

  useEffect(() => {
    const diffDays = getDiffInDays(new Date(footer.startTime))
    setDays(diffDays)
  }, [])

  if (days < 0) {
    return <span>Ops! 网站还没有发布</span>
  }

  return <span>已经运行了 {days} 天</span>
}
