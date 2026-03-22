export const flutterDetails = {
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
