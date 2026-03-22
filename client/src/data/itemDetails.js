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
  }
};