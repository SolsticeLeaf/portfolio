export default {
    nickname: "SolsticeLeaf",
    siteName: "SLEAF",
    hero: {
        avatar_url: 'https://ik.imagekit.io/kiinse/8b283c0366762231-sticker-transformed.webp?updatedAt=1723924643048'
    },
    socialLinks: [
        {
            icon: 'github',
            url: 'https://github.com/SolsticeLeaf'
        },
        {
            icon: 'linkedin',
            url: 'https://www.linkedin.com/in/SolsticeLeaf'
        },
    ],
    announcements: {
        otherSpeed: 6 as number,
        desktopSpeed: 8 as number
    },
    api: {
        projects: 'https://sleaf.dev:7272/api/getProjects',
        project: 'https://sleaf.dev:7272/api/getProject/{id}',
        announcements: 'https://sleaf.dev:7272/api/getAnnouncements'
    }
}
