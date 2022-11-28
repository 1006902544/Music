declare namespace global {
  interface article {
    from: {
      uid: string
      name: string
    }
    aid: string
    title: string
    images: Array<string>
    publish_time: number
    likes_count: number
  }

  interface comment {
    cid: string
  }

  interface fans {
    uid: string
    name: string
  }

  interface concern {
    uid: string
    name: string
  }
}