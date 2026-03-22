export const ITEM_DETAILS = {
  "k1": {
    "title": "Kotlin Syntax cơ bản",
    "summary": "Kotlin được thiết kế theo triết lý \"Expression-oriented & Safe by Default\": mọi thứ từ biến, hàm, đến control flow đều hướng đến code ngắn gọn, tường minh và an toàn. Compiler làm nhiều việc hơn (type inference, smart cast, exhaustive check) để lập trình viên focus vào logic — không phải boilerplate.",
    "url": "https://android-notebook.netlify.app/kotlin/fundamentals"
  },
  "k2": {
    "title": "Null safety",
    "summary": "Kotlin phân biệt nullable (String?) và non-null (String). Tránh NullPointerException tại compile time.",
    "url": "https://android-notebook.netlify.app/kotlin/fundamentals#1-null-safety-an-to%C3%A0n-null"
  },
  "k3": {
    "title": "OOP (class, object, inheritance, interface)",
    "summary": "Kotlin OOP: class, open/abstract class, interface với default implementation, object/companion object.",
    "url": "https://android-notebook.netlify.app/kotlin/fundamentals"
  },
  "k4": {
    "title": "Data class",
    "summary": "Data class tự sinh equals/hashCode/toString/copy/componentN dựa trên các property trong constructor.",
    "url": "https://android-notebook.netlify.app/kotlin/fundamentals#2-data-classes"
  },
  "k5": {
    "title": "Sealed class",
    "summary": "Sealed class hạn chế hierarchy – compiler biết hết subclass, dùng kết hợp with when exhaustive.",
    "url": "https://android-notebook.netlify.app/kotlin/fundamentals#3-sealed-classes"
  },
  "k6": {
    "title": "Enum",
    "summary": "Enum class – tập hợp hằng số có kiểu, hỗ trợ properties, methods và abstract methods.",
    "url": "https://android-notebook.netlify.app/kotlin/fundamentals#4-enum-classes"
  },
  "k7": {
    "title": "Extension function",
    "summary": "Thêm function vào class có sẵn mà không kế thừa. Được resolve statically.",
    "url": "https://android-notebook.netlify.app/kotlin/fundamentals#5-extension-functions"
  },
  "k8": {
    "title": "Scope functions (let, run, apply, also, with)",
    "summary": "Scope functions cho phép viết code ngắn gọn hơn trong một block với context object.",
    "url": "https://android-notebook.netlify.app/kotlin/fundamentals#6-scope-functions"
  },
  "k9": {
    "title": "Lambda / Higher-order function",
    "summary": "Higher-order function nhận hoặc trả về function. Lambda là anonymous function literal.",
    "url": "https://android-notebook.netlify.app/kotlin/fundamentals#7-higher-order-functions--lambdas"
  },
  "k10": {
    "title": "Generics",
    "summary": "Generics cho phép type-safe code tái sử dụng. Kotlin hỗ trợ variance: in/out và reified.",
    "url": "https://android-notebook.netlify.app/kotlin/fundamentals#8-generics"
  },
  "k11": {
    "title": "Delegation",
    "summary": "Kotlin hỗ trợ delegation pattern qua by keyword: class delegation và property delegation.",
    "url": "https://android-notebook.netlify.app/kotlin/fundamentals"
  },
  "k12": {
    "title": "Coroutines",
    "summary": "Coroutines là lightweight threads cho async programming. Chạy trên CoroutineScope với Dispatcher.",
    "url": "https://android-notebook.netlify.app/async/coroutines-flow"
  },
  "k13": {
    "title": "Flow / Channel",
    "summary": "Flow là cold stream bất đồng bộ. Channel là hot communication giữa coroutines.",
    "url": "https://android-notebook.netlify.app/async/coroutines-flow"
  },
  "f1": {
    "title": "Activity lifecycle",
    "summary": "Activity có 7 lifecycle callbacks: onCreate, onStart, onResume, onPause, onStop, onDestroy, onRestart.",
    "url": "https://android-notebook.netlify.app/android/components"
  },
  "f2": {
    "title": "Fragment lifecycle",
    "summary": "Fragment lifecycle liên kết với Activity nhưng có thêm onCreateView, onViewCreated, onDestroyView.",
    "url": "https://android-notebook.netlify.app/android/components"
  },
  "f3": {
    "title": "Context types",
    "summary": "Context là cầu nối với hệ thống Android. Có 2 loại chính: Application Context và Activity Context.",
    "url": "https://android-notebook.netlify.app/android/components"
  },
  "f4": {
    "title": "Intent",
    "summary": "Intent là message object để start Activity/Service hoặc deliver broadcast.",
    "url": "https://android-notebook.netlify.app/android/components"
  },
  "f5": {
    "title": "BroadcastReceiver",
    "summary": "BroadcastReceiver lắng nghe system/app broadcasts. Có 2 loại: static (manifest) và dynamic (code).",
    "url": "https://android-notebook.netlify.app/android/components"
  },
  "f6": {
    "title": "Service",
    "summary": "Service chạy background tasks. 3 loại: Started, Foreground, Bound Service.",
    "url": "https://android-notebook.netlify.app/android/components"
  },
  "f7": {
    "title": "ContentProvider",
    "summary": "ContentProvider chia sẻ structured data giữa apps qua URI chuẩn.",
    "url": "https://android-notebook.netlify.app/android/components"
  },
  "f8": {
    "title": "Permissions",
    "summary": "Android permissions: Normal (tự cấp) và Dangerous (user approve). API 23+ runtime permissions.",
    "url": "https://android-notebook.netlify.app/android/components"
  },
  "f9": {
    "title": "Configuration change",
    "summary": "Configuration change (xoay màn hình, dark mode...) tái tạo Activity. ViewModel giữ data qua thay đổi.",
    "url": "https://android-notebook.netlify.app/android/components"
  },
  "f10": {
    "title": "SavedInstanceState",
    "summary": "onSaveInstanceState lưu UI state tạm thời để restore sau configuration change hoặc process death.",
    "url": "https://android-notebook.netlify.app/android/components"
  },
  "ux1": {
    "title": "View system",
    "summary": "Android View system: View là UI unit cơ bản, ViewGroup là container. Vẽ theo measure-layout-draw.",
    "url": "https://android-notebook.netlify.app/android/components"
  },
  "ux2": {
    "title": "Layouts",
    "summary": "LinearLayout, RelativeLayout, FrameLayout, ConstraintLayout. Nên dùng ConstraintLayout để flat hierarchy.",
    "url": "https://android-notebook.netlify.app/android/components"
  },
  "ux3": {
    "title": "ConstraintLayout",
    "summary": "ConstraintLayout giúp tạo UI phức tạp với flat hierarchy dùng constraints.",
    "url": "https://android-notebook.netlify.app/android/components"
  },
  "ux4": {
    "title": "RecyclerView",
    "summary": "RecyclerView tái sử dụng ViewHolder để hiển thị danh sách lớn hiệu quả.",
    "url": "https://android-notebook.netlify.app/android/components"
  },
  "ux5": {
    "title": "Adapter pattern",
    "summary": "Adapter là bridge giữa data source và RecyclerView/ListView.",
    "url": "https://android-notebook.netlify.app/android/components"
  },
  "ux6": {
    "title": "DiffUtil",
    "summary": "DiffUtil tính diff giữa 2 list, chỉ update item thay đổi, tốt hơn notifyDataSetChanged().",
    "url": "https://android-notebook.netlify.app/android/components"
  },
  "ux7": {
    "title": "Custom View",
    "summary": "Custom View kế thừa View/ViewGroup, override onMeasure/onLayout/onDraw.",
    "url": "https://android-notebook.netlify.app/android/components"
  },
  "ux8": {
    "title": "Animations",
    "summary": "Android animations: View Animation, Property Animation (Animator), Transition Framework.",
    "url": "https://android-notebook.netlify.app/android/components"
  },
  "uc1": {
    "title": "Composable lifecycle",
    "summary": "Composable vào/ra Composition khi state thay đổi. Lifecycle: Enter → Recompose* → Leave.",
    "url": "https://android-notebook.netlify.app/android/compose"
  },
  "uc2": {
    "title": "Recomposition",
    "summary": "Recomposition: Compose chỉ re-render composable bị ảnh hưởng bởi state thay đổi.",
    "url": "https://android-notebook.netlify.app/android/compose"
  },
  "uc3": {
    "title": "State management",
    "summary": "State trong Compose: mutableStateOf, remember, hoisting, ViewModel StateFlow.",
    "url": "https://android-notebook.netlify.app/android/compose"
  },
  "uc4": {
    "title": "remember / rememberSaveable",
    "summary": "remember lưu state qua recompose. rememberSaveable lưu qua configuration change và process death.",
    "url": "https://android-notebook.netlify.app/android/compose"
  },
  "uc5": {
    "title": "Side effects",
    "summary": "Side effects trong Compose: LaunchedEffect, SideEffect, DisposableEffect, produceState, derivedStateOf.",
    "url": "https://android-notebook.netlify.app/android/compose"
  },
  "uc6": {
    "title": "Navigation Compose",
    "summary": "Navigation Compose dùng NavController để navigate giữa composable destinations.",
    "url": "https://android-notebook.netlify.app/android/compose"
  },
  "uc7": {
    "title": "Theming",
    "summary": "Material 3 Theming: MaterialTheme với colorScheme, typography, shapes.",
    "url": "https://android-notebook.netlify.app/android/compose"
  },
  "a1": {
    "title": "MVC",
    "summary": "MVC: Model-View-Controller. Controller xử lý logic, phổ biến ở web, ít dùng trong Android hiện đại.",
    "url": "https://android-notebook.netlify.app/architecture/patterns"
  },
  "a2": {
    "title": "MVP",
    "summary": "MVP: Model-View-Presenter. Presenter xử lý logic, View là passive interface, dễ unit test.",
    "url": "https://android-notebook.netlify.app/architecture/patterns"
  },
  "a3": {
    "title": "MVVM",
    "summary": "MVVM: Model-View-ViewModel. ViewModel expose state qua StateFlow/LiveData. View observe và render.",
    "url": "https://android-notebook.netlify.app/architecture/patterns"
  },
  "a4": {
    "title": "MVI",
    "summary": "MVI: Model-View-Intent. State là immutable, Intent là user action, reducer tính state mới.",
    "url": "https://android-notebook.netlify.app/architecture/patterns"
  },
  "a5": {
    "title": "Clean Architecture",
    "summary": "3 layers: Presentation, Domain, Data. Dependency rule: outer layers depend on inner.",
    "url": "https://android-notebook.netlify.app/architecture/clean-architecture"
  },
  "a6": {
    "title": "SOLID",
    "summary": "SOLID: 5 principles để code dễ maintain, extend, test.",
    "url": "https://android-notebook.netlify.app/architecture/solid-principles"
  },
  "a7": {
    "title": "Repository pattern",
    "summary": "Repository abstract data sources (API, DB, cache). ViewModel chỉ biết Repository interface.",
    "url": "https://android-notebook.netlify.app/architecture/clean-architecture"
  },
  "a8": {
    "title": "UseCase / Domain",
    "summary": "UseCase chứa business logic đơn lẻ, gọi Repository, trả result cho ViewModel.",
    "url": "https://android-notebook.netlify.app/architecture/clean-architecture"
  },
  "a9": {
    "title": "Dependency Injection",
    "summary": "DI cung cấp dependencies từ bên ngoài, giảm coupling, tăng testability.",
    "url": "https://android-notebook.netlify.app/di/hilt"
  },
  "j1": {
    "title": "ViewModel",
    "summary": "ViewModel lưu UI state qua configuration change, không tham chiếu Activity/Fragment.",
    "url": "https://android-notebook.netlify.app/android/components"
  },
  "j2": {
    "title": "LiveData",
    "summary": "LiveData là lifecycle-aware observable data holder. Chỉ deliver khi observer STARTED/RESUMED.",
    "url": "https://android-notebook.netlify.app/android/components"
  },
  "j3": {
    "title": "StateFlow",
    "summary": "StateFlow là hot flow có initial value, luôn giữ state hiện tại. Thay thế LiveData trong Kotlin.",
    "url": "https://android-notebook.netlify.app/async/coroutines-flow"
  },
  "j4": {
    "title": "Navigation",
    "summary": "Jetpack Navigation quản lý back stack và navigation giữa destinations.",
    "url": "https://android-notebook.netlify.app/android/compose"
  },
  "j5": {
    "title": "Room",
    "summary": "Room là ORM layer trên SQLite. @Entity, @Dao, @Database.",
    "url": "https://android-notebook.netlify.app/android/room"
  },
  "j6": {
    "title": "WorkManager",
    "summary": "WorkManager chạy guaranteed background work, kể cả khi app bị kill hoặc device reboot.",
    "url": "https://android-notebook.netlify.app/async/workmanager"
  },
  "j7": {
    "title": "Paging 3",
    "summary": "Paging 3 load data theo trang từ network/DB, tích hợp RecyclerView và Compose.",
    "url": "https://android-notebook.netlify.app/android/components"
  },
  "j8": {
    "title": "DataStore",
    "summary": "DataStore thay thế SharedPreferences. Preferences DataStore (key-value) và Proto DataStore (typed).",
    "url": "https://android-notebook.netlify.app/android/room"
  },
  "j9": {
    "title": "Hilt / Dagger",
    "summary": "Hilt là DI library built on Dagger, tích hợp với Android components.",
    "url": "https://android-notebook.netlify.app/di/hilt"
  },
  "c1": {
    "title": "Threading model",
    "summary": "Android main thread (UI thread). Background work dùng Coroutines, WorkManager, hoặc threads.",
    "url": "https://android-notebook.netlify.app/async/coroutines-flow"
  },
  "c2": {
    "title": "Coroutines",
    "summary": "Coroutines: lightweight, structured, sequential async code.",
    "url": "https://android-notebook.netlify.app/async/coroutines-flow"
  },
  "c3": {
    "title": "Dispatcher",
    "summary": "Dispatcher quyết định coroutine chạy trên thread nào.",
    "url": "https://android-notebook.netlify.app/async/coroutines-flow"
  },
  "c4": {
    "title": "Structured concurrency",
    "summary": "Structured concurrency: coroutine children không vượt scope cha, cancellation lan truyền.",
    "url": "https://android-notebook.netlify.app/async/coroutines-flow"
  },
  "c5": {
    "title": "Flow cold vs hot",
    "summary": "Cold flow: chỉ chạy khi có collector. Hot flow (StateFlow/SharedFlow): chạy kể cả không có collector.",
    "url": "https://android-notebook.netlify.app/async/coroutines-flow"
  },
  "c6": {
    "title": "StateFlow vs SharedFlow",
    "summary": "StateFlow: 1 value hiện tại, replay=1. SharedFlow: configurable replay, broadcast.",
    "url": "https://android-notebook.netlify.app/async/coroutines-flow"
  },
  "c7": {
    "title": "RxJava basics",
    "summary": "RxJava: reactive programming với Observable streams. Ít dùng hơn trong project Kotlin mới.",
    "url": "https://android-notebook.netlify.app/async/coroutines-flow"
  },
  "n1": {
    "title": "Retrofit",
    "summary": "Retrofit là type-safe HTTP client. Define API interface, Retrofit tự generate implementation.",
    "url": "https://android-notebook.netlify.app/networking/"
  },
  "n2": {
    "title": "OkHttp",
    "summary": "OkHttp là HTTP client underlying Retrofit. Xử lý connection pooling, caching, interceptors.",
    "url": "https://android-notebook.netlify.app/networking/"
  },
  "n3": {
    "title": "WebSocket",
    "summary": "WebSocket cho real-time bidirectional communication. OkHttp hỗ trợ WebSocket natively.",
    "url": "https://android-notebook.netlify.app/networking/"
  },
  "n4": {
    "title": "Serialization",
    "summary": "JSON serialization: Gson, Moshi, kotlinx.serialization. Chuyển đổi JSON ↔ Kotlin objects.",
    "url": "https://android-notebook.netlify.app/networking/"
  },
  "n5": {
    "title": "Error handling",
    "summary": "Xử lý network errors: HTTP errors, IOException, timeout. Dùng sealed class Result để wrap.",
    "url": "https://android-notebook.netlify.app/networking/"
  },
  "n6": {
    "title": "Retry strategy",
    "summary": "Retry mechanism: exponential backoff, max retries, retry on specific errors.",
    "url": "https://android-notebook.netlify.app/networking/"
  },
  "n7": {
    "title": "Caching strategy",
    "summary": "HTTP caching với OkHttp Cache. Cache-Control headers. Room làm offline cache.",
    "url": "https://android-notebook.netlify.app/networking/"
  },
  "s1": {
    "title": "SharedPreferences",
    "summary": "SharedPreferences lưu key-value nhỏ. Deprecated bởi DataStore vì API synchronous và không safe.",
    "url": "https://android-notebook.netlify.app/android/room"
  },
  "s2": {
    "title": "DataStore",
    "summary": "DataStore: async, safe, Flow-based replacement cho SharedPreferences.",
    "url": "https://android-notebook.netlify.app/android/room"
  },
  "s3": {
    "title": "Room",
    "summary": "Room Database: SQLite wrapper với compile-time query validation, Flow support.",
    "url": "https://android-notebook.netlify.app/android/room"
  },
  "s4": {
    "title": "SQLite",
    "summary": "SQLite là relational DB embedded trong Android. Room là recommended wrapper.",
    "url": "https://android-notebook.netlify.app/android/room"
  },
  "s5": {
    "title": "File storage",
    "summary": "Android file storage: Internal storage (private), External storage (public/scoped).",
    "url": "https://android-notebook.netlify.app/android/room"
  },
  "s6": {
    "title": "Cache management",
    "summary": "Cache giảm network request. Disk cache (OkHttp), memory cache (LruCache), image cache (Coil/Glide).",
    "url": "https://android-notebook.netlify.app/android/room"
  },
  "p1": {
    "title": "Memory leak",
    "summary": "Memory leak: object không được GC vì còn reference. Phổ biến: Context leak, static reference, inner class.",
    "url": "https://android-notebook.netlify.app/android/components"
  },
  "p2": {
    "title": "ANR",
    "summary": "ANR (App Not Responding): main thread bị block > 5s (Activity) hoặc 10s (Broadcast).",
    "url": "https://android-notebook.netlify.app/android/components"
  },
  "p3": {
    "title": "UI rendering",
    "summary": "60fps = 16ms/frame. Jank khi frame miss. Tối ưu: flat hierarchy, hardware acceleration, overdraw reduction.",
    "url": "https://android-notebook.netlify.app/android/components"
  },
  "p4": {
    "title": "App startup optimization",
    "summary": "Giảm cold start time: lazy init, App Startup library, baseline profile.",
    "url": "https://android-notebook.netlify.app/android/components"
  },
  "p5": {
    "title": "Lazy loading",
    "summary": "Lazy loading: chỉ load data/UI khi cần. Paging 3 cho list, lazy { } cho Kotlin, LazyColumn trong Compose.",
    "url": "https://android-notebook.netlify.app/android/components"
  },
  "p6": {
    "title": "Bitmap optimization",
    "summary": "Bitmap tốn nhiều memory. Dùng Coil/Glide để cache, resize, và load hiệu quả.",
    "url": "https://android-notebook.netlify.app/android/components"
  },
  "p7": {
    "title": "Profiling tools",
    "summary": "Android Studio Profiler: CPU, Memory, Network, Battery profiler.",
    "url": "https://android-notebook.netlify.app/android/components"
  },
  "t1": {
    "title": "Unit test",
    "summary": "Unit test kiểm tra 1 unit code (function/class) độc lập với dependencies.",
    "url": "https://android-notebook.netlify.app/android/components"
  },
  "t2": {
    "title": "Integration test",
    "summary": "Integration test kiểm tra nhiều component kết hợp. Chạy trên device/emulator hoặc Robolectric.",
    "url": "https://android-notebook.netlify.app/android/components"
  },
  "t3": {
    "title": "UI test",
    "summary": "UI test (Espresso, Compose Testing) tương tác UI và verify visual state.",
    "url": "https://android-notebook.netlify.app/android/components"
  },
  "t4": {
    "title": "Mockk / Mockito",
    "summary": "Mocking cho dependencies trong unit tests. MockK cho Kotlin, Mockito cho Java/Kotlin.",
    "url": "https://android-notebook.netlify.app/android/components"
  },
  "t5": {
    "title": "Coroutine testing",
    "summary": "Test coroutines với kotlinx-coroutines-test: TestCoroutineDispatcher, runTest, advanceTimeBy.",
    "url": "https://android-notebook.netlify.app/async/coroutines-flow"
  },
  "t6": {
    "title": "TDD",
    "summary": "TDD: Test-Driven Development. Write failing test → implement → refactor (Red-Green-Refactor).",
    "url": "https://android-notebook.netlify.app/android/components"
  },
  "b1": {
    "title": "Gradle",
    "summary": "Gradle là build system của Android. build.gradle.kts (KTS) là format mới.",
    "url": "https://android-notebook.netlify.app/android/components"
  },
  "b2": {
    "title": "Build variants",
    "summary": "Build variants = Build Type x Product Flavor. debug, release là 2 build types mặc định.",
    "url": "https://android-notebook.netlify.app/android/components"
  },
  "b3": {
    "title": "Product flavors",
    "summary": "Product flavors tạo nhiều variants của app (free/paid, staging/production).",
    "url": "https://android-notebook.netlify.app/android/components"
  },
  "b4": {
    "title": "Proguard / R8",
    "summary": "R8 (thay Proguard): shrink, obfuscate, optimize code cho release build.",
    "url": "https://android-notebook.netlify.app/android/components"
  },
  "b5": {
    "title": "App signing",
    "summary": "APK/AAB phải ký bằng keystore trước khi publish. Google Play App Signing quản lý key.",
    "url": "https://android-notebook.netlify.app/android/components"
  },
  "b6": {
    "title": "CI/CD",
    "summary": "CI/CD tự động hoá build, test, deploy. Phổ biến: GitHub Actions, Bitrise, CircleCI, Fastlane.",
    "url": "https://android-notebook.netlify.app/android/components"
  },
  "ad1": {
    "title": "Modularization",
    "summary": "Chia app thành modules độc lập: :app, :feature:home, :core:network, :core:ui, :core:data.",
    "url": "https://android-notebook.netlify.app/android/components"
  },
  "ad2": {
    "title": "Dynamic feature modules",
    "summary": "Dynamic Delivery: download feature on-demand sau khi install, giảm APK size ban đầu.",
    "url": "https://android-notebook.netlify.app/android/components"
  },
  "ad3": {
    "title": "Multi-module architecture",
    "summary": "Architecture cho multi-module: navigation graph giữa features, DI setup với Hilt subcomponents.",
    "url": "https://android-notebook.netlify.app/android/components"
  },
  "ad4": {
    "title": "System design Android",
    "summary": "Android system design: offline-first, real-time sync, pagination, caching strategies.",
    "url": "https://android-notebook.netlify.app/android/components"
  },
  "ad5": {
    "title": "Large scale architecture",
    "summary": "Architecture cho app lớn: convention plugins, version catalog, shared module patterns.",
    "url": "https://android-notebook.netlify.app/android/components"
  },
  "ad6": {
    "title": "Security (encryption, obfuscation)",
    "summary": "Android security: EncryptedSharedPreferences, Android Keystore, Certificate pinning, R8 obfuscation.",
    "url": "https://android-notebook.netlify.app/android/components"
  },
  "ad7": {
    "title": "Play Store optimization",
    "summary": "ASO (App Store Optimization), Android App Bundle, Play Asset Delivery, In-App Review.",
    "url": "https://android-notebook.netlify.app/android/components"
  },
  "dp1": {
    "title": "Singleton",
    "summary": "Đảm bảo chỉ có một instance duy nhất của class tồn tại trong toàn bộ ứng dụng.",
    "url": ""
  },
  "dp2": {
    "title": "Builder",
    "summary": "Xây dựng object phức tạp theo từng bước, tách rời quá trình tạo khỏi representation.",
    "url": ""
  },
  "dp3": {
    "title": "Factory Method",
    "summary": "Định nghĩa interface tạo object, để subclass quyết định class nào được tạo.",
    "url": ""
  },
  "dp4": {
    "title": "Abstract Factory",
    "summary": "Tạo ra họ các object liên quan mà không chỉ định class cụ thể.",
    "url": ""
  },
  "dp5": {
    "title": "Prototype",
    "summary": "Clone object hiện tại thay vì tạo mới, hữu ích khi khởi tạo object tốn chi phí cao.",
    "url": ""
  },
  "dp6": {
    "title": "Adapter",
    "summary": "Chuyển đổi interface của class sang interface khác mà client mong đợi.",
    "url": ""
  },
  "dp7": {
    "title": "Decorator",
    "summary": "Thêm behavior mới vào object tại runtime bằng cách wrap nó, không thay đổi class gốc.",
    "url": ""
  },
  "dp8": {
    "title": "Facade",
    "summary": "Cung cấp interface đơn giản cho một hệ thống con phức tạp — che giấu sự phức tạp bên trong.",
    "url": ""
  },
  "dp9": {
    "title": "Proxy",
    "summary": "Cung cấp đối tượng thay thế để kiểm soát truy cập — lazy loading, caching, access control.",
    "url": ""
  },
  "dp10": {
    "title": "Composite",
    "summary": "Xử lý object đơn lẻ và nhóm object theo cách thống nhất — cấu trúc cây.",
    "url": ""
  },
  "dp11": {
    "title": "Bridge",
    "summary": "Tách abstraction khỏi implementation để cả hai có thể thay đổi độc lập nhau.",
    "url": ""
  },
  "dp12": {
    "title": "Observer",
    "summary": "Một object thay đổi → thông báo tự động đến tất cả các object đang theo dõi nó.",
    "url": ""
  },
  "dp13": {
    "title": "Strategy",
    "summary": "Định nghĩa một họ thuật toán, đóng gói từng cái, cho phép hoán đổi linh hoạt tại runtime.",
    "url": ""
  },
  "dp14": {
    "title": "Command",
    "summary": "Đóng gói request như một object — hỗ trợ undo/redo, queue, logging các action.",
    "url": ""
  },
  "dp15": {
    "title": "Chain of Responsibility",
    "summary": "Truyền request qua chuỗi handler cho đến khi có handler xử lý được.",
    "url": ""
  },
  "dp16": {
    "title": "Template Method",
    "summary": "Định nghĩa skeleton của thuật toán trong base class, để subclass override các bước cụ thể.",
    "url": ""
  },
  "dp17": {
    "title": "State",
    "summary": "Object thay đổi behavior dựa trên state nội tại — như máy trạng thái (FSM).",
    "url": ""
  },
  "dp18": {
    "title": "Iterator",
    "summary": "Cung cấp cách tuần tự truy cập các phần tử mà không expose cấu trúc bên trong.",
    "url": ""
  },
  "dp19": {
    "title": "Mediator",
    "summary": "Giảm sự phụ thuộc trực tiếp giữa các object bằng cách giao tiếp qua một đối tượng trung gian.",
    "url": ""
  },

  // ========================
  // FLUTTER — Dart Language
  // ========================
  "d1": {
    "title": "Dart Syntax cơ bản",
    "summary": "Dart dùng var (infer type), final (runtime constant), const (compile-time constant), late (lazy init). Type inference mạnh — compiler tự suy kiểu, code ngắn gọn nhưng vẫn type-safe.",
    "url": "https://dart.dev/language/variables"
  },
  "d2": {
    "title": "Null Safety",
    "summary": "Dart null safety phân biệt nullable (String?) và non-null (String). Tránh null dereference tại compile time. Dùng !, ?., ??, ??= để xử lý nullable values.",
    "url": "https://dart.dev/null-safety"
  },
  "d3": {
    "title": "OOP (class, abstract, interface, mixin)",
    "summary": "Dart OOP: class đơn kế thừa, abstract class, interface (mọi class đều là implicit interface), mixin với with keyword để tái sử dụng code không qua kế thừa.",
    "url": "https://dart.dev/language/classes"
  },
  "d4": {
    "title": "Collections (List, Set, Map)",
    "summary": "Dart collections: List (ordered, index-based), Set (unique elements), Map (key-value). Hỗ trợ collection if, collection for, spread operator (...) để build collections linh hoạt.",
    "url": "https://dart.dev/language/collections"
  },
  "d5": {
    "title": "Generics",
    "summary": "Generics cho phép type-safe code tái sử dụng. Dart đặc biệt hỗ trợ reified generics — type thực sự tồn tại tại runtime, khác Java type erasure.",
    "url": "https://dart.dev/language/generics"
  },
  "d6": {
    "title": "Extension Methods",
    "summary": "Extension methods thêm functionality vào class có sẵn mà không kế thừa. Được resolve statically. Phổ biến để extend String, List, BuildContext trong Flutter.",
    "url": "https://dart.dev/language/extension-methods"
  },
  "d7": {
    "title": "async / await / Future",
    "summary": "Future đại diện cho giá trị sẽ có trong tương lai — single value async. async/await là syntactic sugar cho Future chaining, giúp viết async code readable như sync code.",
    "url": "https://dart.dev/libraries/async/async-await"
  },
  "d8": {
    "title": "Stream",
    "summary": "Stream là sequence of async events — multiple values theo thời gian. Single-subscription stream (default) vs Broadcast stream (nhiều listener). StreamController để tạo custom stream.",
    "url": "https://dart.dev/libraries/async/using-streams"
  },
  "d9": {
    "title": "Isolates",
    "summary": "Dart single-threaded nhưng có Isolates cho true parallelism. Isolates không share memory, giao tiếp qua message passing (SendPort/ReceivePort). Flutter dùng compute() để wrap.",
    "url": "https://dart.dev/language/concurrency"
  },
  "d10": {
    "title": "Records & Patterns (Dart 3)",
    "summary": "Records: anonymous immutable aggregate type — (int, String) hay (x: 1, y: 2). Patterns cho destructuring, matching trong switch expressions. Dart 3 mang lại exhaustive patterns.",
    "url": "https://dart.dev/language/records"
  },

  // ============================
  // FLUTTER — Flutter Fundamentals
  // ============================
  "fl1": {
    "title": "Widget tree & Element tree",
    "summary": "Flutter có 3 trees: Widget (blueprint, immutable), Element (instance, mutable, lifecycle), RenderObject (layout & paint). Widget.build() tạo Widget tree mới; Element tree reconcile diff.",
    "url": "https://docs.flutter.dev/resources/architectural-overview"
  },
  "fl2": {
    "title": "BuildContext",
    "summary": "BuildContext là handle tới vị trí widget trong Element tree. Dùng để traverse tree (Theme.of, Navigator.of, MediaQuery.of). Không dùng BuildContext sau async gap (mounted check).",
    "url": "https://docs.flutter.dev/resources/architectural-overview"
  },
  "fl3": {
    "title": "StatelessWidget vs StatefulWidget",
    "summary": "StatelessWidget: immutable, build() thuần từ props. StatefulWidget: có State object tách biệt, gọi setState() để trigger rebuild. State tồn tại qua rebuilds của widget.",
    "url": "https://docs.flutter.dev/ui/widgets-intro"
  },
  "fl4": {
    "title": "Widget Lifecycle",
    "summary": "StatefulWidget lifecycle: createState → initState → didChangeDependencies → build → didUpdateWidget → deactivate → dispose. initState chỉ gọi một lần, dispose để cleanup resources.",
    "url": "https://docs.flutter.dev/ui/widgets-intro"
  },
  "fl5": {
    "title": "Keys",
    "summary": "Keys giúp Flutter nhận diện widget identity khi tree thay đổi. GlobalKey (access state từ anywhere), LocalKey (ValueKey, ObjectKey, UniqueKey) cho lists. Quan trọng với StatefulWidget.",
    "url": "https://docs.flutter.dev/ui/widgets-intro#keys"
  },
  "fl6": {
    "title": "InheritedWidget",
    "summary": "InheritedWidget truyền data xuống tree mà không cần prop drilling. Khi InheritedWidget thay đổi, widgets dùng context.dependOnInheritedWidgetOfExactType() tự rebuild.",
    "url": "https://api.flutter.dev/flutter/widgets/InheritedWidget-class.html"
  },
  "fl7": {
    "title": "RenderObject Tree",
    "summary": "RenderObject thực hiện layout (constraints-based) và painting. Widget tree → Element tree → RenderObject tree. RenderObject đắt để tạo, nên Flutter cố tái sử dụng qua reconciliation.",
    "url": "https://docs.flutter.dev/resources/architectural-overview#rendering-and-layout"
  },
  "fl8": {
    "title": "Hot Reload vs Hot Restart",
    "summary": "Hot Reload: inject code mới vào Dart VM, giữ nguyên State — nhanh, dùng khi sửa UI. Hot Restart: restart toàn bộ app, xóa State — dùng khi thay đổi logic initState, main().",
    "url": "https://docs.flutter.dev/tools/hot-reload"
  },

  // ========================
  // FLUTTER — Widgets
  // ========================
  "w1": {
    "title": "Layout Widgets (Row, Column, Stack, Flex)",
    "summary": "Row/Column: linear layout theo trục ngang/dọc. mainAxisAlignment, crossAxisAlignment, Expanded, Flexible. Stack: layers chồng nhau với Positioned. FlexFit.tight vs FlexFit.loose.",
    "url": "https://docs.flutter.dev/ui/layout"
  },
  "w2": {
    "title": "Scrollable Widgets (ListView, GridView, CustomScrollView)",
    "summary": "ListView: scroll theo chiều dọc. ListView.builder cho list dài (lazy). GridView cho 2D. CustomScrollView + Slivers cho scroll phức tạp (SliverAppBar, SliverList, SliverGrid).",
    "url": "https://docs.flutter.dev/ui/layout/scrolling"
  },
  "w3": {
    "title": "Text & TextField",
    "summary": "Text widget với TextStyle, TextOverflow, TextAlign. TextField với TextEditingController để đọc/kiểm soát input. TextFormField trong Form với validation. FocusNode manage keyboard focus.",
    "url": "https://docs.flutter.dev/ui/widgets/input"
  },
  "w4": {
    "title": "Image & NetworkImage",
    "summary": "Image.asset (bundle), Image.network (URL với cache), Image.file (disk). BoxFit để kiểm soát fit. cached_network_image cho production caching. Placeholder và errorBuilder.",
    "url": "https://docs.flutter.dev/ui/assets/images"
  },
  "w5": {
    "title": "GestureDetector & InkWell",
    "summary": "GestureDetector: detect tap, long press, drag, scale — không có ripple. InkWell: Material ripple effect khi tap, phải nằm trong Material widget. onTap, onLongPress callbacks.",
    "url": "https://docs.flutter.dev/ui/interactivity"
  },
  "w6": {
    "title": "AppBar, Drawer, BottomNavigationBar",
    "summary": "AppBar: title, actions, leading, bottom (TabBar). Drawer: side navigation. BottomNavigationBar: tab navigation với currentIndex. NavigationBar là Material 3 version.",
    "url": "https://docs.flutter.dev/ui/widgets/material"
  },
  "w7": {
    "title": "Dialog, SnackBar, BottomSheet",
    "summary": "showDialog() + AlertDialog. ScaffoldMessenger.showSnackBar() cho temporary messages. showModalBottomSheet() cho bottom panels. showGeneralDialog cho fully custom dialogs.",
    "url": "https://docs.flutter.dev/ui/widgets/material"
  },
  "w8": {
    "title": "AnimatedWidget & AnimatedBuilder",
    "summary": "AnimatedWidget: subclass, rebuild khi Listenable thay đổi. AnimatedBuilder: builder pattern, chỉ rebuild subtree cần thiết. AnimationController + Tween + CurvedAnimation.",
    "url": "https://docs.flutter.dev/ui/animations"
  },
  "w9": {
    "title": "CustomPaint",
    "summary": "CustomPaint cho phép vẽ trực tiếp lên Canvas với CustomPainter. Override paint() và shouldRepaint(). Dùng cho charts, custom UI, complex shapes mà widget system không đáp ứng.",
    "url": "https://api.flutter.dev/flutter/widgets/CustomPaint-class.html"
  },
  "w10": {
    "title": "Sliver Widgets",
    "summary": "Slivers là scrollable regions với custom scroll behavior. SliverAppBar (collapsing), SliverList, SliverGrid, SliverToBoxAdapter. Kết hợp trong CustomScrollView để tạo scroll experience phức tạp.",
    "url": "https://docs.flutter.dev/ui/layout/scrolling/slivers"
  },

  // ==============================
  // FLUTTER — State Management
  // ==============================
  "sm1": {
    "title": "setState",
    "summary": "setState() trigger rebuild của StatefulWidget. Chỉ dùng cho local/ephemeral state không cần share. Quá đơn giản cho complex app — lifting state up, InheritedWidget khi cần share.",
    "url": "https://docs.flutter.dev/data-and-backend/state-mgmt/ephemeral-vs-app"
  },
  "sm2": {
    "title": "InheritedWidget & InheritedModel",
    "summary": "InheritedWidget: low-level state sharing qua tree. InheritedModel: selective rebuild — chỉ rebuild widget khi aspect cụ thể thay đổi. Provider package build trên InheritedWidget.",
    "url": "https://docs.flutter.dev/data-and-backend/state-mgmt/options#inheritedwidget-and-inheritedmodel"
  },
  "sm3": {
    "title": "Provider",
    "summary": "Provider wraps InheritedWidget với API đơn giản hơn. ChangeNotifierProvider + Consumer/context.watch(). MultiProvider cho nhiều providers. Recommended bởi Flutter team cho small-medium apps.",
    "url": "https://pub.dev/packages/provider"
  },
  "sm4": {
    "title": "Riverpod",
    "summary": "Riverpod: compile-safe, testable state management. Provider được declare ở top-level. Ref để đọc providers. StateNotifierProvider, FutureProvider, StreamProvider. Không cần BuildContext.",
    "url": "https://riverpod.dev"
  },
  "sm5": {
    "title": "BLoC / Cubit",
    "summary": "BLoC (Business Logic Component): Events → BLoC → States. Cubit: đơn giản hơn, emit() trực tiếp. flutter_bloc package. BlocBuilder, BlocListener, BlocConsumer. Highly testable.",
    "url": "https://bloclibrary.dev"
  },
  "sm6": {
    "title": "GetX",
    "summary": "GetX: all-in-one (state, navigation, DI). Obx() reactive builder, GetxController, Get.to() navigation. Simple nhưng opinionated — ít boilerplate, không cần BuildContext cho navigation.",
    "url": "https://pub.dev/packages/get"
  },
  "sm7": {
    "title": "MobX",
    "summary": "MobX: reactive state management với Observable, Action, Computed. Code generation via build_runner. Observer widget tự rebuild khi Observable thay đổi. Inspired by MobX JS.",
    "url": "https://pub.dev/packages/mobx"
  },
  "sm8": {
    "title": "Redux",
    "summary": "Redux: single immutable State tree, Actions, Reducers. Predictable state với strict unidirectional flow. Verbose boilerplate nhưng excellent devtools (time-travel debugging). flutter_redux package.",
    "url": "https://pub.dev/packages/flutter_redux"
  },

  // ================================
  // FLUTTER — Navigation & Routing
  // ================================
  "nav1": {
    "title": "Navigator 1.0 (push/pop)",
    "summary": "Navigator 1.0: imperative API. Navigator.push(), Navigator.pop(), Navigator.pushNamed(). Back stack managed by Flutter. Đơn giản nhưng khó handle deep link và web URL.",
    "url": "https://docs.flutter.dev/ui/navigation"
  },
  "nav2": {
    "title": "Navigator 2.0 (Router API)",
    "summary": "Navigator 2.0: declarative routing qua RouterDelegate và RouteInformationParser. Sync URL với app state. Phức tạp hơn nhưng hỗ trợ deep link, web URL, back button đầy đủ.",
    "url": "https://medium.com/flutter/learning-flutters-new-navigation-and-routing-system-7c9068155ade"
  },
  "nav3": {
    "title": "go_router",
    "summary": "go_router: declarative routing package chính thức (Google). Route config dạng tree, path params, query params, redirects, ShellRoute cho nested navigation. Đơn giản hóa Navigator 2.0.",
    "url": "https://pub.dev/packages/go_router"
  },
  "nav4": {
    "title": "Named Routes",
    "summary": "Named routes định nghĩa trong MaterialApp.routes. Navigator.pushNamed('/detail'). Đơn giản nhưng không type-safe, khó truyền complex objects. go_router giải quyết vấn đề này.",
    "url": "https://docs.flutter.dev/cookbook/navigation/named-routes"
  },
  "nav5": {
    "title": "Deep Linking",
    "summary": "Deep linking mở app tới specific screen từ URL. Android: intent-filter. iOS: Universal Links. Flutter: flutter/deeplinking, go_router hỗ trợ native deep links tự động.",
    "url": "https://docs.flutter.dev/ui/navigation/deep-linking"
  },
  "nav6": {
    "title": "Bottom Navigation Pattern",
    "summary": "Bottom nav pattern giữ state của từng tab. IndexedStack (giữ state, tốn memory) vs Offstage. ShellRoute trong go_router cho persistent tabs với proper URL routing.",
    "url": "https://docs.flutter.dev/ui/widgets/material"
  },

  // ==========================
  // FLUTTER — Architecture
  // ==========================
  "ar1": {
    "title": "MVC trong Flutter",
    "summary": "MVC ít dùng thuần trong Flutter. Controller xử lý logic, View là Widget, Model là data. Không có built-in support — thường implemented thủ công hoặc qua GetX Controller.",
    "url": "https://docs.flutter.dev/data-and-backend/state-mgmt/options"
  },
  "ar2": {
    "title": "MVVM",
    "summary": "MVVM phổ biến trong Flutter: ViewModel (ChangeNotifier/StateNotifier) expose UI state, View (Widget) observe và render. Provider hoặc Riverpod làm glue layer. Dễ test ViewModel.",
    "url": "https://docs.flutter.dev/data-and-backend/state-mgmt/options"
  },
  "ar3": {
    "title": "MVI / Unidirectional Data Flow",
    "summary": "MVI: State immutable, Events từ UI, Intents xử lý business logic ra State mới. BLoC pattern implement MVI. Predictable, debuggable — state history có thể replay.",
    "url": "https://bloclibrary.dev/architecture"
  },
  "ar4": {
    "title": "Clean Architecture",
    "summary": "3 layers: Presentation (Widgets + ViewModel/BLoC), Domain (UseCases + Entities + Repository interfaces), Data (Repository impl + API + DB). Dependency rule: chỉ depend inward.",
    "url": "https://resocoder.com/flutter-clean-architecture-tdd/"
  },
  "ar5": {
    "title": "Repository Pattern",
    "summary": "Repository abstract data sources — ViewModel/UseCase không biết data từ API hay local DB. Repository interface ở Domain layer, implementation ở Data layer. Mock dễ dàng cho testing.",
    "url": "https://docs.flutter.dev/data-and-backend/state-mgmt/options"
  },
  "ar6": {
    "title": "UseCase / Domain Layer",
    "summary": "UseCase chứa một business logic đơn lẻ, gọi Repository, trả về Either<Failure, Data> hoặc Result. Tránh fat ViewModel. ViewModel gọi UseCase, không gọi Repository trực tiếp.",
    "url": "https://resocoder.com/flutter-clean-architecture-tdd/"
  },
  "ar7": {
    "title": "Dependency Injection (get_it, injectable)",
    "summary": "get_it: service locator pattern — đơn giản, không cần BuildContext. injectable: code generation với @injectable, @LazySingleton, @factoryMethod. Kết hợp với Riverpod cho DI hoàn chỉnh.",
    "url": "https://pub.dev/packages/get_it"
  },

  // ================================
  // FLUTTER — Async & Concurrency
  // ================================
  "ac1": {
    "title": "Future & async/await",
    "summary": "Future<T> là single async value. async function trả về Future. await suspend coroutine tới Future complete. Future.wait() chạy parallel. then/catchError/whenComplete chaining.",
    "url": "https://dart.dev/libraries/async/async-await"
  },
  "ac2": {
    "title": "Stream & StreamController",
    "summary": "Stream<T>: async sequence của events. StreamController tạo custom stream với sink và stream. async* generator tạo Stream. Operators: map, where, transform. Broadcast stream cho multi-listener.",
    "url": "https://dart.dev/libraries/async/using-streams"
  },
  "ac3": {
    "title": "Isolates",
    "summary": "Isolates chạy code trên thread riêng với separate memory heap. Giao tiếp qua SendPort/ReceivePort message passing. Dùng cho heavy CPU work (image processing, parsing large JSON).",
    "url": "https://dart.dev/language/concurrency"
  },
  "ac4": {
    "title": "compute()",
    "summary": "compute() là helper đơn giản cho Isolates: compute(function, argument). Function phải là top-level hoặc static. Trả về Future. Dùng khi cần offload một task nặng ra background.",
    "url": "https://api.flutter.dev/flutter/foundation/compute.html"
  },
  "ac5": {
    "title": "FutureBuilder & StreamBuilder",
    "summary": "FutureBuilder rebuild widget dựa trên Future state (waiting/done/error). StreamBuilder tương tự cho Stream. ConnectionState enum để handle loading/error/data states trong UI.",
    "url": "https://docs.flutter.dev/data-and-backend/state-mgmt/simple"
  },
  "ac6": {
    "title": "Completer",
    "summary": "Completer<T>: tạo Future mà bạn kiểm soát completion thủ công. completer.complete(value) hoặc completer.completeError(error). Hữu ích khi bridge callback-based API sang Future.",
    "url": "https://api.dart.dev/stable/dart-async/Completer-class.html"
  },
  "ac7": {
    "title": "Error Handling trong Async",
    "summary": "try/catch trong async functions. Future.catchError() hoặc onError parameter. Result/Either pattern để type-safe error handling. Zone để global uncaught error handling trong Flutter.",
    "url": "https://dart.dev/libraries/async/futures-error-handling"
  },

  // ========================
  // FLUTTER — Networking
  // ========================
  "net1": {
    "title": "http Package",
    "summary": "http package: official Dart HTTP client. http.get/post/put/delete. BaseClient để customize. Đơn giản nhưng thiếu interceptors, retry, multipart — dùng Dio cho production.",
    "url": "https://pub.dev/packages/http"
  },
  "net2": {
    "title": "Dio",
    "summary": "Dio: powerful HTTP client với interceptors, global config, FormData, timeout, cancel token. Interceptors cho auth token injection và error handling tập trung. Tương đương OkHttp/Retrofit.",
    "url": "https://pub.dev/packages/dio"
  },
  "net3": {
    "title": "JSON Serialization (json_serializable, freezed)",
    "summary": "json_serializable: code gen @JsonSerializable — tạo toJson/fromJson. freezed: immutable data classes với copyWith, pattern matching, union types. build_runner để generate code.",
    "url": "https://pub.dev/packages/freezed"
  },
  "net4": {
    "title": "Error Handling & Interceptors",
    "summary": "Dio interceptors: RequestInterceptor (inject auth header), ResponseInterceptor (parse error), ErrorInterceptor (retry logic). Wrap API response trong Result<T, Failure> để safe handling.",
    "url": "https://pub.dev/packages/dio"
  },
  "net5": {
    "title": "WebSocket",
    "summary": "WebSocket cho real-time bidirectional communication. Dart built-in WebSocket class. web_socket_channel package với StreamChannel. Dùng cho chat, live updates, gaming.",
    "url": "https://pub.dev/packages/web_socket_channel"
  },
  "net6": {
    "title": "GraphQL",
    "summary": "graphql_flutter package: GraphQL client với caching, subscriptions. Query, Mutation, Subscription widgets. Normalized cache. Hữu ích khi backend dùng GraphQL API.",
    "url": "https://pub.dev/packages/graphql_flutter"
  },

  // ========================
  // FLUTTER — Storage
  // ========================
  "st1": {
    "title": "shared_preferences",
    "summary": "shared_preferences lưu key-value cơ bản (bool, int, double, String, List<String>). Async API. Không encrypt — dùng flutter_secure_storage cho sensitive data. Platform: NSUserDefaults/SharedPreferences.",
    "url": "https://pub.dev/packages/shared_preferences"
  },
  "st2": {
    "title": "flutter_secure_storage",
    "summary": "flutter_secure_storage lưu data encrypted: Keychain (iOS), Keystore (Android). Dùng cho tokens, passwords, sensitive info. API giống shared_preferences nhưng secure.",
    "url": "https://pub.dev/packages/flutter_secure_storage"
  },
  "st3": {
    "title": "Hive",
    "summary": "Hive: lightweight NoSQL database thuần Dart. Key-value boxes. HiveObject cho typed objects. Rất nhanh (pure Dart, không native). Tốt cho mobile khi không cần complex queries.",
    "url": "https://pub.dev/packages/hive_flutter"
  },
  "st4": {
    "title": "Isar",
    "summary": "Isar: high-performance NoSQL DB từ tác giả Hive. Full Dart, cross-platform. Schemas với @collection, complex queries với Isar Inspector. Nhanh hơn Hive, hỗ trợ indexing và relationships.",
    "url": "https://pub.dev/packages/isar"
  },
  "st5": {
    "title": "SQLite (sqflite)",
    "summary": "sqflite: SQLite wrapper cho Flutter. Chạy trên IO thread. Raw SQL hoặc Map-based queries. drift package thêm type-safety và query builder trên sqflite. Tốt cho relational data.",
    "url": "https://pub.dev/packages/sqflite"
  },
  "st6": {
    "title": "File I/O",
    "summary": "path_provider lấy đường dẫn directories (getApplicationDocumentsDirectory, getTemporaryDirectory). File class để read/write. dart:io cho cross-platform file operations.",
    "url": "https://pub.dev/packages/path_provider"
  },

  // ========================
  // FLUTTER — Performance
  // ========================
  "pf1": {
    "title": "Rebuild Optimization (const, Keys)",
    "summary": "const widget không bao giờ rebuild — dùng khi có thể. Tránh rebuild không cần thiết bằng cách tách widget nhỏ. Sử dụng Key đúng cách để giữ state qua rebuild. shouldRebuild trong Consumer.",
    "url": "https://docs.flutter.dev/perf/best-practices"
  },
  "pf2": {
    "title": "RepaintBoundary",
    "summary": "RepaintBoundary isolate subtree ra layer riêng — khi subtree cần repaint thường xuyên (animations) trong khi phần còn lại static. Tránh lạm dụng — mỗi boundary tốn memory.",
    "url": "https://api.flutter.dev/flutter/widgets/RepaintBoundary-class.html"
  },
  "pf3": {
    "title": "DevTools & Flutter Inspector",
    "summary": "Flutter DevTools: Widget Inspector (widget tree, layout explorer), Performance tab (frame timeline, jank), Memory tab, Network tab. flutter pub global activate devtools để chạy.",
    "url": "https://docs.flutter.dev/tools/devtools/overview"
  },
  "pf4": {
    "title": "Jank / Frame Drops (16ms budget)",
    "summary": "60fps = 16ms/frame. UI và Raster threads có 8ms mỗi thread. Timeline trong DevTools để identify jank. Offload heavy work ra Isolate. Tránh expensive operations trong build().",
    "url": "https://docs.flutter.dev/perf/rendering-performance"
  },
  "pf5": {
    "title": "Image Caching (cached_network_image)",
    "summary": "cached_network_image: cache network images vào disk và memory. Placeholder và error widgets. Flutter Image widget tự cache vào memory nhưng không persist sang disk khi restart.",
    "url": "https://pub.dev/packages/cached_network_image"
  },
  "pf6": {
    "title": "App Size Optimization",
    "summary": "flutter build appbundle (AAB nhỏ hơn APK). --split-debug-info và --obfuscate. Deferred components (dynamic feature). Kiểm tra size với flutter build --analyze-size.",
    "url": "https://docs.flutter.dev/perf/app-size"
  },
  "pf7": {
    "title": "Deferred Loading",
    "summary": "Deferred loading (loadLibrary()) load Dart library lazily khi cần. Giảm initial bundle size. Kết hợp với Flutter deferred components để download feature code on-demand từ Play Store.",
    "url": "https://docs.flutter.dev/perf/deferred-components"
  },

  // ========================
  // FLUTTER — Testing
  // ========================
  "te1": {
    "title": "Unit Test",
    "summary": "Unit test trong Flutter dùng test package. Không cần Flutter framework — test pure Dart logic (ViewModel, UseCase, Repository impl). Nhanh, chạy trên máy không cần emulator.",
    "url": "https://docs.flutter.dev/testing/overview#unit-tests"
  },
  "te2": {
    "title": "Widget Test",
    "summary": "Widget test render widget trong test environment (không cần real device). pumpWidget(), find.byType/text/key, tester.tap/enterText. WidgetTester để simulate interactions.",
    "url": "https://docs.flutter.dev/testing/overview#widget-tests"
  },
  "te3": {
    "title": "Integration Test",
    "summary": "Integration test chạy trên real device/emulator. integration_test package. Kiểm tra full app flow. Chậm hơn nhưng đảm bảo app hoạt động end-to-end. CI/CD với Firebase Test Lab.",
    "url": "https://docs.flutter.dev/testing/integration-tests"
  },
  "te4": {
    "title": "Mocking (mockito, mocktail)",
    "summary": "mockito: code gen @GenerateMocks để tạo mock class. mocktail: không cần code gen, API tương tự mockito. when().thenReturn/thenAnswer. verify() để assert interactions.",
    "url": "https://pub.dev/packages/mocktail"
  },
  "te5": {
    "title": "Golden Tests",
    "summary": "Golden tests chụp screenshot widget và so sánh với golden image (snapshot). Phát hiện UI regression. matchesGoldenFile matcher. Cần update golden khi UI intentionally thay đổi.",
    "url": "https://api.flutter.dev/flutter/flutter_test/matchesGoldenFile.html"
  },
  "te6": {
    "title": "flutter_test & testWidgets",
    "summary": "flutter_test là test framework built vào Flutter SDK. testWidgets() wrap widget tests. setUp/tearDown hooks. group() để organize tests. expect() với Flutter-specific matchers (findsOneWidget).",
    "url": "https://api.flutter.dev/flutter/flutter_test/flutter_test-library.html"
  },

  // ========================
  // FLUTTER — Build & Release
  // ========================
  "bu1": {
    "title": "pubspec.yaml & pub.dev",
    "summary": "pubspec.yaml: app metadata, dependencies, assets, fonts config. pub.dev là Dart/Flutter package registry. flutter pub get, flutter pub upgrade. dart pub publish để publish package.",
    "url": "https://dart.dev/tools/pub/pubspec"
  },
  "bu2": {
    "title": "Build Flavors",
    "summary": "Flutter flavors tương đương Product Flavors Android. --flavor flag khi build. Config khác nhau cho dev/staging/prod: API URL, Firebase project, app icon. Dart defines (--dart-define).",
    "url": "https://docs.flutter.dev/deployment/flavors"
  },
  "bu3": {
    "title": "App Signing (Android & iOS)",
    "summary": "Android: keystore file, key.properties, signingConfigs trong build.gradle. iOS: provisioning profiles, certificates trong Xcode. Fastlane Match để quản lý iOS certificates theo team.",
    "url": "https://docs.flutter.dev/deployment/android#signing-the-app"
  },
  "bu4": {
    "title": "Play Store & App Store Deploy",
    "summary": "Android: flutter build appbundle → Upload sang Play Store (AAB). iOS: flutter build ipa → Xcode Archive → App Store Connect. Fastlane supply/deliver để automate upload.",
    "url": "https://docs.flutter.dev/deployment/android"
  },
  "bu5": {
    "title": "CI/CD (Fastlane, GitHub Actions, Codemagic)",
    "summary": "Fastlane: automate build, test, deploy với lanes. GitHub Actions: .yml workflows cho CI. Codemagic: cloud CI/CD chuyên Flutter, handle iOS codesigning. Bitrise cũng phổ biến.",
    "url": "https://docs.flutter.dev/deployment/cd"
  },
  "bu6": {
    "title": "Obfuscation & Minify",
    "summary": "flutter build --obfuscate --split-debug-info=<dir>: obfuscate Dart code. R8 cho Android Java/Kotlin code. Upload symbol files để deobfuscate crash reports trong Firebase Crashlytics.",
    "url": "https://docs.flutter.dev/deployment/obfuscate"
  }
};