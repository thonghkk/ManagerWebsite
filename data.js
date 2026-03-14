// Default data – loaded only if localStorage is empty
const DEFAULT_DATA = [
  {
    id: "kotlin",
    name: "Kotlin",
    icon: "🎯",
    items: [
      { id: "k1",  name: "Syntax cơ bản",                      done: false, note: "" },
      { id: "k2",  name: "Null safety",                         done: false, note: "" },
      { id: "k3",  name: "OOP (class, object, inheritance, interface)", done: false, note: "" },
      { id: "k4",  name: "Data class",                          done: false, note: "" },
      { id: "k5",  name: "Sealed class",                        done: false, note: "" },
      { id: "k6",  name: "Enum",                                done: false, note: "" },
      { id: "k7",  name: "Extension function",                  done: false, note: "" },
      { id: "k8",  name: "Scope functions (let, run, apply, also, with)", done: false, note: "" },
      { id: "k9",  name: "Lambda / Higher-order function",      done: false, note: "" },
      { id: "k10", name: "Generics",                            done: false, note: "" },
      { id: "k11", name: "Delegation",                          done: false, note: "" },
      { id: "k12", name: "Coroutines",                          done: false, note: "" },
      { id: "k13", name: "Flow / Channel",                      done: false, note: "" },
    ]
  },
  {
    id: "fundamentals",
    name: "Android Fundamentals",
    icon: "🏛️",
    items: [
      { id: "f1",  name: "Activity lifecycle",       done: false, note: "" },
      { id: "f2",  name: "Fragment lifecycle",       done: false, note: "" },
      { id: "f3",  name: "Context types",            done: false, note: "" },
      { id: "f4",  name: "Intent",                   done: false, note: "" },
      { id: "f5",  name: "BroadcastReceiver",        done: false, note: "" },
      { id: "f6",  name: "Service",                  done: false, note: "" },
      { id: "f7",  name: "ContentProvider",          done: false, note: "" },
      { id: "f8",  name: "Permissions",              done: false, note: "" },
      { id: "f9",  name: "Configuration change",     done: false, note: "" },
      { id: "f10", name: "SavedInstanceState",       done: false, note: "" },
    ]
  },
  {
    id: "ui-xml",
    name: "UI (XML)",
    icon: "🎨",
    items: [
      { id: "ux1", name: "View system",       done: false, note: "" },
      { id: "ux2", name: "Layouts",           done: false, note: "" },
      { id: "ux3", name: "ConstraintLayout",  done: false, note: "" },
      { id: "ux4", name: "RecyclerView",      done: false, note: "" },
      { id: "ux5", name: "Adapter pattern",   done: false, note: "" },
      { id: "ux6", name: "DiffUtil",          done: false, note: "" },
      { id: "ux7", name: "Custom View",       done: false, note: "" },
      { id: "ux8", name: "Animations",        done: false, note: "" },
    ]
  },
  {
    id: "ui-compose",
    name: "UI (Compose)",
    icon: "💠",
    items: [
      { id: "uc1", name: "Composable lifecycle",    done: false, note: "" },
      { id: "uc2", name: "Recomposition",           done: false, note: "" },
      { id: "uc3", name: "State management",        done: false, note: "" },
      { id: "uc4", name: "remember / rememberSaveable", done: false, note: "" },
      { id: "uc5", name: "Side effects",            done: false, note: "" },
      { id: "uc6", name: "Navigation Compose",      done: false, note: "" },
      { id: "uc7", name: "Theming",                 done: false, note: "" },
    ]
  },
  {
    id: "architecture",
    name: "Architecture",
    icon: "🏗️",
    items: [
      { id: "a1", name: "MVC",                   done: false, note: "" },
      { id: "a2", name: "MVP",                   done: false, note: "" },
      { id: "a3", name: "MVVM",                  done: false, note: "" },
      { id: "a4", name: "MVI",                   done: false, note: "" },
      { id: "a5", name: "Clean Architecture",    done: false, note: "" },
      { id: "a6", name: "SOLID",                 done: false, note: "" },
      { id: "a7", name: "Repository pattern",    done: false, note: "" },
      { id: "a8", name: "UseCase / Domain",      done: false, note: "" },
      { id: "a9", name: "Dependency Injection",  done: false, note: "" },
    ]
  },
  {
    id: "jetpack",
    name: "Jetpack",
    icon: "🚀",
    items: [
      { id: "j1", name: "ViewModel",     done: false, note: "" },
      { id: "j2", name: "LiveData",      done: false, note: "" },
      { id: "j3", name: "StateFlow",     done: false, note: "" },
      { id: "j4", name: "Navigation",    done: false, note: "" },
      { id: "j5", name: "Room",          done: false, note: "" },
      { id: "j6", name: "WorkManager",   done: false, note: "" },
      { id: "j7", name: "Paging 3",      done: false, note: "" },
      { id: "j8", name: "DataStore",     done: false, note: "" },
      { id: "j9", name: "Hilt / Dagger", done: false, note: "" },
    ]
  },
  {
    id: "concurrency",
    name: "Concurrency",
    icon: "⚙️",
    items: [
      { id: "c1", name: "Threading model",          done: false, note: "" },
      { id: "c2", name: "Coroutines",               done: false, note: "" },
      { id: "c3", name: "Dispatcher",               done: false, note: "" },
      { id: "c4", name: "Structured concurrency",   done: false, note: "" },
      { id: "c5", name: "Flow cold vs hot",         done: false, note: "" },
      { id: "c6", name: "StateFlow vs SharedFlow",  done: false, note: "" },
      { id: "c7", name: "RxJava basics",            done: false, note: "" },
    ]
  },
  {
    id: "networking",
    name: "Networking",
    icon: "🌐",
    items: [
      { id: "n1", name: "Retrofit",          done: false, note: "" },
      { id: "n2", name: "OkHttp",            done: false, note: "" },
      { id: "n3", name: "WebSocket",         done: false, note: "" },
      { id: "n4", name: "Serialization",     done: false, note: "" },
      { id: "n5", name: "Error handling",    done: false, note: "" },
      { id: "n6", name: "Retry strategy",    done: false, note: "" },
      { id: "n7", name: "Caching strategy",  done: false, note: "" },
    ]
  },
  {
    id: "storage",
    name: "Storage",
    icon: "💾",
    items: [
      { id: "s1", name: "SharedPreferences", done: false, note: "" },
      { id: "s2", name: "DataStore",         done: false, note: "" },
      { id: "s3", name: "Room",              done: false, note: "" },
      { id: "s4", name: "SQLite",            done: false, note: "" },
      { id: "s5", name: "File storage",      done: false, note: "" },
      { id: "s6", name: "Cache management",  done: false, note: "" },
    ]
  },
  {
    id: "performance",
    name: "Performance",
    icon: "⚡",
    items: [
      { id: "p1", name: "Memory leak",             done: false, note: "" },
      { id: "p2", name: "ANR",                     done: false, note: "" },
      { id: "p3", name: "UI rendering",            done: false, note: "" },
      { id: "p4", name: "App startup optimization",done: false, note: "" },
      { id: "p5", name: "Lazy loading",            done: false, note: "" },
      { id: "p6", name: "Bitmap optimization",     done: false, note: "" },
      { id: "p7", name: "Profiling tools",         done: false, note: "" },
    ]
  },
  {
    id: "testing",
    name: "Testing",
    icon: "🧪",
    items: [
      { id: "t1", name: "Unit test",          done: false, note: "" },
      { id: "t2", name: "Integration test",   done: false, note: "" },
      { id: "t3", name: "UI test",            done: false, note: "" },
      { id: "t4", name: "Mockk / Mockito",    done: false, note: "" },
      { id: "t5", name: "Coroutine testing",  done: false, note: "" },
      { id: "t6", name: "TDD",               done: false, note: "" },
    ]
  },
  {
    id: "build",
    name: "Build & Release",
    icon: "📦",
    items: [
      { id: "b1", name: "Gradle",           done: false, note: "" },
      { id: "b2", name: "Build variants",   done: false, note: "" },
      { id: "b3", name: "Product flavors",  done: false, note: "" },
      { id: "b4", name: "Proguard / R8",   done: false, note: "" },
      { id: "b5", name: "App signing",      done: false, note: "" },
      { id: "b6", name: "CI/CD",            done: false, note: "" },
    ]
  },
  {
    id: "advanced",
    name: "Advanced / Senior",
    icon: "🏆",
    items: [
      { id: "ad1", name: "Modularization",              done: false, note: "" },
      { id: "ad2", name: "Dynamic feature modules",     done: false, note: "" },
      { id: "ad3", name: "Multi-module architecture",   done: false, note: "" },
      { id: "ad4", name: "System design Android",       done: false, note: "" },
      { id: "ad5", name: "Large scale architecture",    done: false, note: "" },
      { id: "ad6", name: "Security (encryption, obfuscation)", done: false, note: "" },
      { id: "ad7", name: "Play Store optimization",     done: false, note: "" },
    ]
  },
];
