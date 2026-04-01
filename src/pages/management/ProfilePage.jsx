// This profile page displays member details, skills, and feed activity using profile mock data.
import { profileActivity, profileCard, profileLinks, profileOverview, profileSkills } from '../../data/profileData.js'
import { Avatar } from '../../components/common/Avatar.jsx'
import { Button } from '../../components/common/Button.jsx'
import { PageHeader } from '../../components/common/PageHeader.jsx'
import { SurfaceCard } from '../../components/common/SurfaceCard.jsx'

export const ProfilePage = () => {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="People" title={profileOverview.title} description={profileOverview.description} />
      <div className="grid gap-4 xl:grid-cols-[0.72fr_1.28fr]">
        <div className="space-y-4">
          <SurfaceCard className="text-center">
            <div className="flex justify-center">
              <Avatar initials={profileCard.initials} size="xl" accent />
            </div>
            <h2 className="mt-4 text-2xl font-semibold text-white">{profileCard.name}</h2>
            <p className="mt-1 text-sm text-slate-400">{profileCard.role}</p>
            <p className="mt-4 text-sm leading-6 text-slate-400">{profileCard.bio}</p>
            <div className="mt-6 flex gap-3">
              <Button className="flex-1">Follow</Button>
              <Button className="flex-1" variant="secondary">Message</Button>
            </div>
          </SurfaceCard>

          <SurfaceCard>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Skills</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {profileSkills.map((skill) => (
                <span key={skill} className="rounded-full bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-300">{skill}</span>
              ))}
            </div>
          </SurfaceCard>

          <SurfaceCard className="space-y-3">
            <div className="flex items-center justify-between text-sm"><span className="text-slate-400">Lives in</span><span className="text-white">{profileCard.city}</span></div>
            <div className="flex items-center justify-between text-sm"><span className="text-slate-400">Works at</span><span className="text-white">{profileCard.company}</span></div>
            <div className="flex items-center justify-between text-sm"><span className="text-slate-400">From</span><span className="text-white">{profileCard.hometown}</span></div>
          </SurfaceCard>

          <SurfaceCard className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Elsewhere</p>
            {profileLinks.map((link) => (
              <div key={link.label} className="flex items-center justify-between text-sm">
                <span className="text-slate-400">{link.label}</span>
                <span className="text-white">{link.value}</span>
              </div>
            ))}
          </SurfaceCard>
        </div>

        <SurfaceCard className="space-y-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Activities</p>
            <h2 className="mt-2 text-xl font-semibold text-white">Recent feed</h2>
          </div>
          {profileActivity.map((item) => (
            <div key={item.id} className="rounded-[24px] border border-white/8 bg-white/[0.03] p-5">
              <div className="flex items-center justify-between gap-3">
                <p className="font-semibold text-white">{item.title}</p>
                <span className="text-xs text-slate-500">{item.time}</span>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-400">{item.body}</p>
            </div>
          ))}
          <Button variant="secondary" className="w-full">Load more</Button>
        </SurfaceCard>
      </div>
    </div>
  )
}

