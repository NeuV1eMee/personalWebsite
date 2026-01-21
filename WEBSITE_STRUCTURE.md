# Website Structure & Design

## Design Theme
- **Global:** Black & White aesthetic.
- **Interaction:** Color appears only on highlighted content.
- **UI Elements:** All clickable elements/buttons are enclosed in brackets, e.g., `[Button]`.
- **Main Page Background:** Silent B&W grainy video loop.
- **Photo Behavior:** Photos on the "wall" are B&W; clicking a photo opens a popup (lightbox) where it becomes colored.
- **Project Behavior:** Alternating layout. Middle item in viewport is colored; others B&W.

## Structure Tree Map

```mermaid
graph TD
    Main[Main Page]
    Main -- Top Right --> ContactBtn[[Contact] Info]
    Main -- Center Text --> Tagline["CRAFTING CODE, CAPTURING LIGHT AND MAKING SOME NOISE."]
    
    Tagline --> NavButtons
    NavButtons --> BuildBtn[[Build]]
    NavButtons --> SoundBtn[[Sound]]
    NavButtons --> AboutBtn[[About]]
    NavButtons --> LensBtn[[Lens]]

    BuildBtn --> Build[Build (Projects)]
    subgraph BuildPage [Build Page Structure]
        Build --> IntroText[Intro Line]
        Build --> ProjectList[Project List (Zig-Zag Layout)]
        
        ProjectList --> Proj1[Project 1: Left Photo / Right Text]
        ProjectList --> Proj2[Project 2: Left Text / Right Photo]
        ProjectList --> ProjN[Project N: ...Alternating...]
        
        Proj1 -- Scroll into View --> CenterFocus{Center of Screen?}
        CenterFocus -- Yes --> Color[Become Colored]
        CenterFocus -- No --> BW[Stay/Revert to B&W]
        
        Proj1 -- Click --> ExternalLink[Go to GitHub/Itch.io/etc.]
    end
    
    SoundBtn --> Sound[Sound (Music)]
    subgraph SoundPage [Sound Page Structure]
        Sound --> VideoHeader[2.35:1 Video Player]
        
        Sound --> BandSection[Band Section]
        BandSection --> BandLeft[Left: Logo & Band Photo]
        BandSection --> BandRight[Right: Band Story]
        
        Sound --> CoversSection[Covers & Stage Section]
        CoversSection --> CoversLeft[Left: Song Covered List]
        CoversSection --> StageRight[Right: Playable Stage Videos]
        
        Sound --> PersonalSection[Personal Music Section]
        PersonalSection --> PersonalLeft[Left: My Story with Music]
        PersonalSection --> PersonalRight[Right: My Rig List]
    end

    AboutBtn --> About[About (CV & Resume)]
    About -- Top Right --> ResumeBtn[[Resume] Download PDF]

    LensBtn --> Lens[Lens (Photos)]
    subgraph LensPage [Lens Page Structure]
        Lens --> Features[Featured Photos Carousel]
        Features -- Left/Right Click --> ViewPhoto[View Photo + Description]
        
        Lens --> Collections[Collections Blocks]
        Collections --> Distortion[[distortion]]
        Collections --> Silence[[silence]]
        Collections --> Strangers[[strangers]]
        Collections --> Polaroid[[polaroid]]
        
        Lens --> AllPhotos[[all photos]]

        Distortion --> PhotoWall[Photo Wall]
        Silence --> PhotoWall
        Strangers --> PhotoWall
        Polaroid --> PhotoWall
        AllPhotos --> PhotoWall

        PhotoWall -- Click Photo --> Popup[Popup / Lightbox (Color)]
    end
```

## Text Representation

```text
Main Page
├── Background: Silent B&W grainy video
├── [Contact] Button (Top Right)
├── Center Content
│   ├── Tagline: "CRAFTING CODE, CAPTURING LIGHT AND MAKING SOME NOISE."
│   └── Navigation Buttons
│       ├── [Build] -> Projects Page
│       ├── [Lens]  -> Photos Page
│       ├── [Sound] -> Music Page
│       └── [About] -> CV Page
├── Build (Projects)
│   ├── Intro Line
│   └── Project List (Zig-Zag Layout)
│       ├── Project 1 (Photo Left / Text Right)
│       ├── Project 2 (Text Left / Photo Right)
│       └── ... (Alternating)
│       └── Behavior:
│           ├── Scroll: Item in center becomes Colored, others B&W
│           └── Click: Redirects to External Showcase (GitHub, Itch.io)
├── Sound (Music)
│   ├── [Section 1] 2.35:1 Video Player (Instrument/Band Performance)
│   ├── [Section 2]
│   │   ├── Left: Band Logo & Band Picture
│   │   └── Right: Band Story
│   ├── [Section 3]
│   │   ├── Left: Song Covered List
│   │   └── Right: Playable Stage Videos
│   └── [Section 4]
│       ├── Left: My Story with Music
│       └── Right: My Rig List
├── About (CV & Resume)
│   └── [Resume] Button (Top Right) - Download PDF
└── Lens (Photos)
    ├── Featured Photos Section
    │   └── Carousel (Left/Right Navigation + Descriptions)
    ├── Category Blocks
    │   ├── [distortion] ──┐
    │   ├── [silence]    ──┤
    │   ├── [strangers]  ──┼──> Photo Wall (Grid)
    │   └── [polaroid]   ──┤    └── Click Photo -> Popup (Color)
    └── [all photos]     ──┘
```


### Pathtree design
my-portfolio/
├── public/                 # 静态资源
│   ├── videos/             # 存放 Fujifilm X-T5 拍摄的背景循环视频
│   ├── photos/             # 摄影作品 (按 collection 文件夹分类)
│   └── resume.pdf          # 你的最新简历 (包含 CSM 认证)
├── src/
│   ├── app/                # Next.js 核心路由 (View 层)
│   │   ├── layout.tsx      # 全局布局：视频背景、[Contact] 按钮
│   │   ├── page.tsx        # Main Page：Tagline 与导航按钮
│   │   ├── build/          # Build (Projects) 页面
│   │   │   └── page.tsx    
│   │   ├── sound/          # Sound (Music) 页面
│   │   │   └── page.tsx    
│   │   ├── lens/           # Lens (Photos) 页面
│   │   │   └── page.tsx    
│   │   └── about/          # About (CV) 页面
│   │       └── page.tsx    
│   ├── components/         # 可复用的 UI 组件
│   │   ├── ui/
│   │   │   ├── BracketButton.tsx  # 标志性的 [Button] 组件
│   │   │   ├── GrainyOverlay.tsx  # 视频上层的颗粒感滤镜
│   │   │   └── Lightbox.tsx       # 点击照片后的彩色弹出层
│   │   ├── ProjectCard.tsx        # Zig-Zag 布局的项目卡片
│   │   └── MusicRigList.tsx       # 你的乐器设备清单 (Roland, Gibson 等)
│   ├── hooks/                     # 自定义逻辑层
│   │   └── useScrollFocus.ts      # 核心：判断元素是否在屏幕中心以触发显色
│   ├── data/                      # 数据层 (Model 层)
│   │   ├── projects.ts            # 存放 SleePurr 等项目的信息
│   │   ├── photos.ts              # 摄影集的元数据
│   │   └── music.ts               # Band Story 和 Cover 列表
│   └── styles/
│       └── globals.css            # Tailwind 全局黑白滤镜配置
└── tailwind.config.js