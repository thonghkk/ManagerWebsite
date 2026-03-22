export const ITEM_DETAILS = {
  // ── Kotlin ───────────────────────────────────────────────────────────────
  k1: {
    title: 'Syntax cơ bản',
    url: 'https://android-notebook.netlify.app/kotlin/fundamentals',
    summary: 'Kotlin được thiết kế với triết lý "Expression-oriented": if, when, try đều trả về giá trị — loại bỏ boilerplate không cần thiết. Từ biến, hàm, đến control flow, mọi thứ đều hướng đến code ngắn gọn, tường minh và an toàn theo từng bước.',
    points: [
      // ── Bắt đầu từ biến: nền tảng của mọi thứ ──
      'Kotlin khuyến khích immutability ngay từ khai báo: mặc định dùng val (read-only reference) thay vì var (mutable) — đây là nền tảng để code dễ đọc và ít bug hơn.',
      'Nhờ type inference, compiler tự suy luận kiểu từ giá trị: val name = "Kotlin" đủ tường minh mà không cần khai báo String như Java — giảm noise, tăng focus vào logic.',
      'val không đồng nghĩa với immutable object: val chỉ đảm bảo reference không bị reassign, nhưng object bên trong (ví dụ MutableList) vẫn có thể bị thay đổi — đây là điểm dễ nhầm lẫn nhất.',
      'Đi xa hơn val một bước là const val: được tính hoàn toàn lúc compile-time và nhúng thẳng vào bytecode, chỉ áp dụng cho String và số nguyên thủy ở top-level hoặc companion object.',
      // ── Type system: hiểu tại sao mọi thứ là Object ──
      'Mặc dù mọi thứ trong Kotlin đều là Object (Int, Boolean...), compiler tự tối ưu xuống Java primitives trong bytecode khi kiểu không nullable — vì vậy không có đánh đổi về hiệu năng.',
      'Khi kiểu được đánh dấu nullable (Int?) hoặc dùng trong Generics, Kotlin mới buộc dùng kiểu wrapper (Integer) — điều này giải thích tại sao null safety và type system liên kết chặt nhau.',
      // ── Hàm: xây dựng trên nền type inference ──
      'Vì đã có type inference, hàm có thể viết dạng expression-body (fun square(x: Int) = x * x) — không cần return, compiler tự suy luận kiểu trả về, code ngắn mà không mất rõ ràng.',
      'Default arguments bổ trợ tự nhiên: thay vì nhiều overloads như Java, một hàm duy nhất với tham số mặc định đã đủ dùng. Named arguments tiếp tục mở rộng: greet(shout = true) tự document call-site.',
      'Top-level functions (hàm đứng ngoài class) là hệ quả logic: không cần class wrapper, compiler tự gom vào FileNameKt.class dưới dạng static final — loại bỏ hoàn toàn class "Utils" của Java.',
      // ── Control flow trở thành expression: nhất quán với hàm ──
      'Vì hàm có thể là một biểu thức, Kotlin mở rộng tư duy đó sang if: if không chỉ là câu lệnh mà trả về giá trị trực tiếp — val type = if (isKotlin) "Modern" else "Legacy" — không cần toán tử ba ngôi.',
      'when tiến hóa tự nhiên từ if: hỗ trợ range check (in 1..10), type check (is String), arbitrary expression làm điều kiện, và không fall-through — loại bỏ cả class bug "quên break" của switch.',
      'Khi when là expression (gán vào biến hoặc return), compiler bắt buộc có else — trừ khi đã cover hết sealed class hoặc enum. Đây là exhaustive check tại compile-time, không phải runtime.',
      'try-catch cũng trở thành expression vì cùng triết lý: val result = try { parse() } catch (e: Exception) { -1 } — không cần biến trung gian, không cần gán lại trong block.',
      // ── Smart Cast: kết quả tự nhiên của type check trong control flow ──
      'Smart Cast là hệ quả trực tiếp của control flow: sau khi compiler thấy if (x is String), nó đủ bằng chứng tự ép kiểu x thành String bên trong block — không cần (x as String) thủ công.',
      'Smart Cast không hoạt động với var trong class vì compiler không đảm bảo thread khác không reassign biến đó giữa lúc check is và lúc dùng — đây là an toàn được bảo đảm tại compile-time, không phải hạn chế.',
      // ── Equality & Ranges: hoàn thiện bức tranh ──
      'Cuối cùng Kotlin đổi lại ngữ nghĩa của ==: thay vì so sánh địa chỉ bộ nhớ như Java, == gọi .equals() (so sánh giá trị). === mới là reference comparison — đây là quyết định thiết kế nhất quán với triết lý "làm đúng mặc định".',
      '1..10 (gồm cả 10) và 1 until 10 (không gồm 10) dùng in operator — nhất quán với when và if, giúp validate và iterate với cùng một cú pháp: val ok = score in 1..100 hoạt động trong mọi context.',
    ],
    code: `// Câu chuyện Kotlin: mỗi tính năng dẫn đến tính năng tiếp theo

// [1] val/var → type inference: compiler tự suy luận, ưu tiên immutable
const val MAX_SCORE = 100             // Compile-time → nhúng thẳng vào bytecode
val language = "Kotlin"              // Type inferred: String, không thể reassign
var retryCount = 0                   // Mutable — chỉ dùng khi thực sự cần

// [2] Vì có type inference → hàm có thể là expression-body
// Vì hàm là expression → default args thay thế overloading
// Vì có default args → named args giúp call-site tường minh
fun classify(score: Int, label: String = ""): String =
    when {                           // when là expression → trả về String trực tiếp
        score >= 90          -> "✅ Xuất sắc \${label}".trim()
        score in 70..89      -> "👍 Tốt"         // range check với in
        score in 50 until 70 -> "📘 Trung bình"  // until: không gồm 70
        else                 -> "❌ Cần cải thiện" // else bắt buộc khi when là expression
    }

// Named args → call-site tự document, không cần nhớ thứ tự
println(classify(score = 85, label = "K1")) // 👍 Tốt K1

// [3] when với type check → compiler đủ bằng chứng → Smart Cast tự động
fun describe(value: Any): String =
    when (value) {
        is String -> "Chuỗi dài \${value.length} ký tự"   // Smart cast → value là String
        is Int    -> "Số, bình phương = \${value * value}" // Smart cast → value là Int
        in 1..100 -> "Nằm trong khoảng hợp lệ"
        else      -> "Không xác định"
    }

// [4] try-catch là expression → nhất quán với if/when
val input = "42abc"
val parsed = try { input.toInt() } catch (e: NumberFormatException) { -1 }

// [5] == so sánh giá trị (gọi .equals()), === so sánh reference
val a = "hello"
val b = String(charArrayOf('h', 'e', 'l', 'l', 'o'))
println(a == b)   // true  — cùng giá trị
println(a === b)  // false — khác object trong memory`,
    interviewTips: [
      '[Junior] val và var khác gì nhau? → val = read-only reference (object bên trong vẫn mutable); var = có thể reassign. Ưu tiên val vì giảm bug, dễ lý luận về code.',
      '[Junior] const val và val khác nhau thế nào? → const val tính toán lúc compile-time, nhúng thẳng vào bytecode, chỉ dùng cho String và số nguyên thủy. val khởi tạo lúc runtime.',
      '[Junior] String template dùng thế nào? → "$biến" cho biến đơn; "${biểu_thức}" cho biểu thức phức tạp. Không cần nối chuỗi bằng + như Java.',
      '[Mid] Kotlin có primitive types không? Tại sao? → Không ở mặt code (mọi thứ là Object), nhưng compiler tự tối ưu xuống Java primitives (int, boolean) khi không nullable — không đánh đổi hiệu năng.',
      '[Mid] == và === trong Kotlin khác nhau thế nào? → == gọi .equals() (so sánh giá trị). === so sánh reference (địa chỉ bộ nhớ). Ngược lại với Java nơi == mặc định là reference comparison.',
      '[Mid] Tại sao Kotlin không cần toán tử ba ngôi ?: của Java? → Vì if là expression: val x = if (a > b) a else b. Trong Kotlin, ?: là Elvis operator dành riêng cho null: val y = nullable ?: "default".',
      '[Mid] when expression bắt buộc có else khi nào? → Khi when dùng làm expression (gán vào biến hoặc return). Ngoại lệ: khi cover hết toàn bộ subclass sealed class hoặc enum entries (exhaustive).',
      '[Mid-Senior] Smart Cast hoạt động thế nào và khi nào KHÔNG hoạt động? → Sau khi check is, compiler đủ bằng chứng tự ép kiểu. Không hoạt động với var trong class vì compiler không đảm bảo thread khác không reassign giữa lúc check và lúc dùng.',
      '[Mid-Senior] Default và named arguments giải quyết bài toán gì? → Default args loại bỏ hoàn toàn overloading. Named args giúp call-site tự document và không phụ thuộc thứ tự — cả hai kết hợp tạo API rõ ràng hơn nhiều.',
      '[Senior] Top-level function biên dịch xuống JVM như thế nào? → Gom vào FileNameKt.class dưới dạng public static final. Từ Java gọi UtilsKt.myFn(). Đổi tên với @file:JvmName("Utils").',
      '[Senior] Tại sao Kotlin bỏ checked exceptions? Đánh đổi gì? → Checked exceptions không thể truyền qua function type trong Higher-Order Functions và Lambda. Đánh đổi: dev dễ bỏ sót xử lý exception → RuntimeException crash. Kotlin khuyến khích sealed class Result<T> thay thế.',
    ],
  },


  k2: {
    title: 'Null safety',

    url: 'https://android-notebook.netlify.app/kotlin/fundamentals#1-null-safety-an-to%C3%A0n-null',
    summary: 'Kotlin phân biệt nullable (String?) và non-null (String). Tránh NullPointerException tại compile time.',
    points: [
      '?: (Elvis) – trả giá trị mặc định khi null',
      '?. (Safe call) – không gọi nếu null',
      '!! (Not-null assertion) – throw NPE nếu null',
      'let { } – chạy block khi không null',
    ],
    interviewTips: [
      'Khi nào dùng !! và hậu quả?',
      'Sự khác nhau giữa ?. và !!.',
    ],
  },
  k3: {
    title: 'OOP (class, object, inheritance, interface)',
    url: 'https://android-notebook.netlify.app/kotlin/fundamentals',
    summary: 'Kotlin OOP: class, open/abstract class, interface với default implementation, object/companion object.',
    points: [
      'Class mặc định là final – cần open để kế thừa',
      'Interface có thể có default implementation',
      'object = singleton; companion object = static members',
      'Constructor chính khai báo trong header class',
    ],
    interviewTips: [
      'Khác biệt giữa abstract class và interface trong Kotlin?',
      'Companion object hoạt động như thế nào?',
    ],
  },
  k4: {
    title: 'Data class',
    url: 'https://android-notebook.netlify.app/kotlin/fundamentals#2-data-classes',
    summary: 'Data class tự sinh equals/hashCode/toString/copy/componentN dựa trên các property trong constructor.',
    points: [
      'copy() cho phép tạo bản sao với vài field thay đổi',
      'Destructuring: val (a, b) = myData',
      'Phải có ít nhất 1 property trong primary constructor',
      'Không thể là abstract/open/sealed',
    ],
    interviewTips: [
      'Data class có thể kế thừa không?',
      'Sự khác biệt giữa == và === với data class?',
    ],
  },
  k5: {
    title: 'Sealed class',
    url: 'https://android-notebook.netlify.app/kotlin/fundamentals#3-sealed-classes',
    summary: 'Sealed class hạn chế hierarchy – compiler biết hết subclass, dùng kết hợp with when exhaustive.',
    points: [
      'Tất cả subclass phải cùng package',
      'when với sealed không cần else nếu cover hết',
      'Dùng để model UI state: Loading/Success/Error',
      'Kotlin 1.5+: subclass có thể ở các file khác cùng module',
    ],
    interviewTips: [
      'Sealed class vs Enum khi nào dùng cái nào?',
      'Sealed class vs sealed interface?',
    ],
  },
  k6: {
    title: 'Enum',
    url: 'https://android-notebook.netlify.app/kotlin/fundamentals#4-enum-classes',
    summary: 'Enum class – tập hợp hằng số có kiểu, hỗ trợ properties, methods và abstract methods.',
    points: [
      'Mỗi entry là singleton instance của enum class',
      'values() và valueOf() là helper mặc định',
      'Hỗ trợ ordinal và name property',
      'Enum có thể implement interface',
    ],
    interviewTips: [
      'Khi nào enum, khi nào sealed class?',
      'Enum vs companion object constants?',
    ],
  },
  k7: {
    title: 'Extension function',
    url: 'https://android-notebook.netlify.app/kotlin/fundamentals#5-extension-functions',
    summary: 'Thêm function vào class có sẵn mà không kế thừa. Được resolve statically.',
    points: [
      'fun String.toast(ctx: Context) { ... }',
      'Extension không override member function',
      'Extension với nullable receiver: fun String?.safe()',
      'Extension properties cũng được hỗ trợ',
    ],
    interviewTips: [
      'Extension function có thể access private members không?',
      'Khác biệt extension vs member function khi override?',
    ],
  },
  k8: {
    title: 'Scope functions (let, run, apply, also, with)',
    url: 'https://android-notebook.netlify.app/kotlin/fundamentals#6-scope-functions',
    summary: 'Scope functions cho phép viết code ngắn gọn hơn trong một block với context object.',
    points: [
      'let: it, trả về lambda result – null check',
      'run: this, trả về lambda result – init + compute',
      'apply: this, trả về object – builder pattern',
      'also: it, trả về object – side effects',
      'with: this, trả về lambda result – nhiều ops trên object',
    ],
    interviewTips: [
      'Phân biệt apply vs also?',
      'let vs run khác gì nhau?',
    ],
  },
  k9: {
    title: 'Lambda / Higher-order function',
    url: 'https://android-notebook.netlify.app/kotlin/fundamentals#7-higher-order-functions--lambdas',
    summary: 'Higher-order function nhận hoặc trả về function. Lambda là anonymous function literal.',
    points: [
      'val fn: (Int) -> String = { i -> "$i" }',
      'it: tên mặc định khi lambda 1 tham số',
      'inline fun giảm overhead khi dùng lambda',
      'Function type: (A, B) -> C',
    ],
    interviewTips: [
      'inline function là gì và tại sao dùng?',
      'Trailing lambda syntax?',
    ],
  },
  k10: {
    title: 'Generics',
    url: 'https://android-notebook.netlify.app/kotlin/fundamentals#8-generics',
    summary: 'Generics cho phép type-safe code tái sử dụng. Kotlin hỗ trợ variance: in/out và reified.',
    points: [
      'out T (covariant) – producer, chỉ đọc',
      'in T (contravariant) – consumer, chỉ ghi',
      'reified: lấy type tại runtime với inline fun',
      'Type erasure ở runtime (trừ reified)',
    ],
    interviewTips: [
      'out và in trong Kotlin generics?',
      'Reified type parameter dùng khi nào?',
    ],
  },
  k11: {
    title: 'Delegation',
    url: 'https://android-notebook.netlify.app/kotlin/fundamentals',
    summary: 'Kotlin hỗ trợ delegation pattern qua by keyword: class delegation và property delegation.',
    points: [
      'Class delegation: class A : I by b',
      'lazy { } – khởi tạo lần đầu truy cập',
      'observable – callback khi property thay đổi',
      'Tự tạo delegate implement getValue/setValue',
    ],
    interviewTips: [
      'lazy vs lateinit khác gì?',
      'Delegation giúp gì về architecture?',
    ],
  },
  k12: {
    title: 'Coroutines',
    url: 'https://android-notebook.netlify.app/async/coroutines-flow',
    summary: 'Coroutines là lightweight threads cho async programming. Chạy trên CoroutineScope với Dispatcher.',
    points: [
      'launch – fire and forget, trả Job',
      'async/await – trả Deferred<T>',
      'suspend fun – có thể suspend không block thread',
      'Dispatcher: Main, IO, Default',
    ],
    interviewTips: [
      'Coroutine vs Thread khác gì?',
      'Structured concurrency là gì?',
    ],
  },
  k13: {
    title: 'Flow / Channel',
    url: 'https://android-notebook.netlify.app/async/coroutines-flow',
    summary: 'Flow là cold stream bất đồng bộ. Channel là hot communication giữa coroutines.',
    points: [
      'Flow: cold – chỉ chạy khi collect',
      'StateFlow: hot – luôn có value hiện tại',
      'SharedFlow: hot – broadcast tới nhiều collector',
      'Channel: send/receive giữa coroutines',
    ],
    interviewTips: [
      'StateFlow vs SharedFlow khác gì?',
      'Flow cold vs hot stream?',
    ],
  },

  // ── Android Fundamentals ─────────────────────────────────────────────────
  f1: {
    title: 'Activity lifecycle',
    url: 'https://android-notebook.netlify.app/android/components',
    summary: 'Activity có 7 lifecycle callbacks: onCreate, onStart, onResume, onPause, onStop, onDestroy, onRestart.',
    points: [
      'onCreate: init UI, restore state',
      'onResume: Activity visible + interactive',
      'onPause: sắp bị covered, save lightweight state',
      'onStop: không visible – release heavy resources',
      'onDestroy: cleanup hoàn toàn',
    ],
    interviewTips: [
      'Thứ tự lifecycle khi xoay màn hình?',
      'Khác biệt onPause vs onStop?',
    ],
  },
  f2: {
    title: 'Fragment lifecycle',
    url: 'https://android-notebook.netlify.app/android/components',
    summary: 'Fragment lifecycle liên kết với Activity nhưng có thêm onCreateView, onViewCreated, onDestroyView.',
    points: [
      'onCreateView: inflate layout',
      'onViewCreated: setup UI sau khi view tạo xong',
      'onDestroyView: release view references',
      'ViewLifecycleOwner cho observing LiveData',
    ],
    interviewTips: [
      'Tại sao dùng viewLifecycleOwner thay lifecycleOwner?',
      'Fragment back stack hoạt động thế nào?',
    ],
  },
  f3: {
    title: 'Context types',
    url: 'https://android-notebook.netlify.app/android/components',
    summary: 'Context là cầu nối với hệ thống Android. Có 2 loại chính: Application Context và Activity Context.',
    points: [
      'Application Context: sống cùng app, tránh leak',
      'Activity Context: dùng cho UI (Dialog, Toast)',
      'getApplicationContext() vs this trong Activity',
      'Tránh giữ Activity context trong singleton',
    ],
    interviewTips: [
      'Memory leak từ Context là gì?',
      'Khi nào dùng Application Context?',
    ],
  },
  f4: {
    title: 'Intent',
    url: 'https://android-notebook.netlify.app/android/components',
    summary: 'Intent là message object để start Activity/Service hoặc deliver broadcast.',
    points: [
      'Explicit Intent: chỉ tên class cụ thể',
      'Implicit Intent: chỉ action, để hệ thống chọn',
      'putExtra() / getStringExtra() truyền data',
      'PendingIntent: đại diện app cho hệ thống thực thi sau',
    ],
    interviewTips: [
      'Explicit vs Implicit Intent?',
      'PendingIntent dùng khi nào?',
    ],
  },
  f5: {
    title: 'BroadcastReceiver',
    url: 'https://android-notebook.netlify.app/android/components',
    summary: 'BroadcastReceiver lắng nghe system/app broadcasts. Có 2 loại: static (manifest) và dynamic (code).',
    points: [
      'onReceive() chạy trên main thread – không block',
      'LocalBroadcastManager cho in-app broadcasts',
      'Android 8.0+: hạn chế static receiver cho implicit broadcast',
      'Ordered broadcast: receiver theo thứ tự priority',
    ],
    interviewTips: [
      'Static vs dynamic BroadcastReceiver?',
      'Tại sao không nên dùng LocalBroadcastManager nữa?',
    ],
  },
  f6: {
    title: 'Service',
    url: 'https://android-notebook.netlify.app/android/components',
    summary: 'Service chạy background tasks. 3 loại: Started, Foreground, Bound Service.',
    points: [
      'Started: startService() – chạy đến khi tự stop',
      'Foreground: hiện notification – ít bị kill',
      'Bound: bindService() – giao tiếp 2 chiều',
      'IntentService: deprecated, dùng WorkManager',
    ],
    interviewTips: [
      'Foreground vs Background Service?',
      'Bound Service dùng khi nào?',
    ],
  },
  f7: {
    title: 'ContentProvider',
    url: 'https://android-notebook.netlify.app/android/components',
    summary: 'ContentProvider chia sẻ structured data giữa apps qua URI chuẩn.',
    points: [
      'CRUD qua: query/insert/update/delete',
      'URI: content://authority/path/id',
      'FileProvider để share files an toàn',
      'CursorLoader để load data async',
    ],
    interviewTips: [
      'ContentProvider vs SQLite trực tiếp?',
      'FileProvider dùng khi nào?',
    ],
  },
  f8: {
    title: 'Permissions',
    url: 'https://android-notebook.netlify.app/android/components',
    summary: 'Android permissions: Normal (tự cấp) và Dangerous (user approve). API 23+ runtime permissions.',
    points: [
      'requestPermissions() cho runtime request',
      'shouldShowRequestPermissionRationale() – explain to user',
      'ActivityResultLauncher mới hơn requestPermissions',
      'Android 12+: approximate location permission',
    ],
    interviewTips: [
      'Normal vs Dangerous permission?',
      'Xử lý khi user deny permission vĩnh viễn?',
    ],
  },
  f9: {
    title: 'Configuration change',
    url: 'https://android-notebook.netlify.app/android/components',
    summary: 'Configuration change (xoay màn hình, dark mode...) tái tạo Activity. ViewModel giữ data qua thay đổi.',
    points: [
      'ViewModel survive configuration change',
      'onSaveInstanceState cho lightweight primitive data',
      'android:configChanges – tự xử lý, không recreate',
      'rememberSaveable trong Compose',
    ],
    interviewTips: [
      'ViewModel vs onSaveInstanceState?',
      'Process death vs configuration change?',
    ],
  },
  f10: {
    title: 'SavedInstanceState',
    url: 'https://android-notebook.netlify.app/android/components',
    summary: 'onSaveInstanceState lưu UI state tạm thời để restore sau configuration change hoặc process death.',
    points: [
      'Chỉ lưu data nhỏ, serializable (Bundle)',
      'Không phù hợp data lớn như Bitmap',
      'onRestoreInstanceState hoặc onCreate bundle',
      'Compose: rememberSaveable tự động',
    ],
    interviewTips: [
      'Process death khác configuration change thế nào?',
      'Giới hạn kích thước Bundle?',
    ],
  },

  // ── UI XML ────────────────────────────────────────────────────────────────
  ux1: {
    title: 'View system',
    url: 'https://android-notebook.netlify.app/android/components',
    summary: 'Android View system: View là UI unit cơ bản, ViewGroup là container. Vẽ theo measure-layout-draw.',
    points: [
      'onMeasure → onLayout → onDraw',
      'invalidate() – yêu cầu redraw',
      'requestLayout() – remeasure + relayout',
      'View hierarchy ảnh hưởng performance',
    ],
    interviewTips: [
      '3 bước vẽ View?',
      'Khi nào gọi invalidate vs requestLayout?',
    ],
  },
  ux2: { title: 'Layouts', url: 'https://android-notebook.netlify.app/android/components', summary: 'LinearLayout, RelativeLayout, FrameLayout, ConstraintLayout. Nên dùng ConstraintLayout để flat hierarchy.', points: ['LinearLayout: theo chiều ngang/dọc', 'FrameLayout: stack views', 'ConstraintLayout: flat, flexible', 'Merge tag giảm nested layouts'], interviewTips: ['Flat hierarchy vs deep hierarchy ảnh hưởng gì?'] },
  ux3: { title: 'ConstraintLayout', url: 'https://android-notebook.netlify.app/android/components', summary: 'ConstraintLayout giúp tạo UI phức tạp với flat hierarchy dùng constraints.', points: ['Chains: spread/packed/weighted', 'Guideline, Barrier, Group', 'MotionLayout cho animation phức tạp', 'Hỗ trợ ratio: layout_constraintDimensionRatio'], interviewTips: ['ConstraintLayout vs RelativeLayout?'] },
  ux4: { title: 'RecyclerView', url: 'https://android-notebook.netlify.app/android/components', summary: 'RecyclerView tái sử dụng ViewHolder để hiển thị danh sách lớn hiệu quả.', points: ['ViewHolder pattern bắt buộc', 'LayoutManager: Linear/Grid/Staggered', 'DiffUtil tính toán diff thông minh', 'ItemAnimator, ItemDecoration'], interviewTips: ['RecyclerView vs ListView?', 'notifyDataSetChanged() có hại gì?'] },
  ux5: { title: 'Adapter pattern', url: 'https://android-notebook.netlify.app/android/components', summary: 'Adapter là bridge giữa data source và RecyclerView/ListView.', points: ['RecyclerView.Adapter + ViewHolder', 'ListAdapter với DiffUtil.ItemCallback', 'ConcatAdapter ghép nhiều adapter', 'submitList() để update data'], interviewTips: ['ListAdapter vs RecyclerView.Adapter?'] },
  ux6: { title: 'DiffUtil', url: 'https://android-notebook.netlify.app/android/components', summary: 'DiffUtil tính diff giữa 2 list, chỉ update item thay đổi, tốt hơn notifyDataSetChanged().', points: ['areItemsTheSame: cùng identity?', 'areContentsTheSame: cùng content?', 'AsyncListDiffer chạy diff trên background', 'ListAdapter tích hợp sẵn DiffUtil'], interviewTips: ['DiffUtil cải thiện performance thế nào?'] },
  ux7: { title: 'Custom View', url: 'https://android-notebook.netlify.app/android/components', summary: 'Custom View kế thừa View/ViewGroup, override onMeasure/onLayout/onDraw.', points: ['Khai báo attrs.xml cho custom attributes', 'obtainStyledAttributes() đọc XML attrs', 'Canvas + Paint để vẽ', 'onSaveInstanceState để lưu custom state'], interviewTips: ['Các bước tạo Custom View?'] },
  ux8: { title: 'Animations', url: 'https://android-notebook.netlify.app/android/components', summary: 'Android animations: View Animation, Property Animation (Animator), Transition Framework.', points: ['ObjectAnimator, ValueAnimator', 'AnimatorSet để chain animations', 'TransitionManager.beginDelayedTransition()', 'MotionLayout cho complex motion'], interviewTips: ['View Animation vs Property Animation?'] },

  // ── UI Compose ────────────────────────────────────────────────────────────
  uc1: { title: 'Composable lifecycle', url: 'https://android-notebook.netlify.app/android/compose', summary: 'Composable vào/ra Composition khi state thay đổi. Lifecycle: Enter → Recompose* → Leave.', points: ['remember lưu state qua recomposition', 'DisposableEffect cleanup khi leave', 'LaunchedEffect chạy coroutine khi key thay đổi', 'Composition != Activity lifecycle'], interviewTips: ['Composable lifecycle vs Activity lifecycle?'] },
  uc2: { title: 'Recomposition', url: 'https://android-notebook.netlify.app/android/compose', summary: 'Recomposition: Compose chỉ re-render composable bị ảnh hưởng bởi state thay đổi.', points: ['Smart recomposition – chỉ update cần thiết', 'Stable types tránh recompose không cần', '@Stable, @Immutable annotation', 'derivedStateOf giảm recompose thừa'], interviewTips: ['Tại sao tránh recompose quá nhiều?', 'Cách debug recomposition?'] },
  uc3: { title: 'State management', url: 'https://android-notebook.netlify.app/android/compose', summary: 'State trong Compose: mutableStateOf, remember, hoisting, ViewModel StateFlow.', points: ['State hoisting: kéo state lên cha', 'Stateless composable dễ test hơn', 'ViewModel + StateFlow/State cho production', 'rememberSaveable survive configuration change'], interviewTips: ['State hoisting là gì và tại sao quan trọng?'] },
  uc4: { title: 'remember / rememberSaveable', url: 'https://android-notebook.netlify.app/android/compose', summary: 'remember lưu state qua recompose. rememberSaveable lưu qua configuration change và process death.', points: ['remember { } – tính toán 1 lần', 'rememberSaveable với Saver tùy chỉnh', 'rememberSaveable tương đương onSaveInstanceState', 'Stateful vs stateless composable'], interviewTips: ['remember vs rememberSaveable?'] },
  uc5: { title: 'Side effects', url: 'https://android-notebook.netlify.app/android/compose', summary: 'Side effects trong Compose: LaunchedEffect, SideEffect, DisposableEffect, produceState, derivedStateOf.', points: ['LaunchedEffect(key) – coroutine, relaunch khi key đổi', 'DisposableEffect – cleanup khi leave', 'SideEffect – mỗi successful recompose', 'produceState – convert non-Compose state'], interviewTips: ['Khi nào dùng LaunchedEffect vs SideEffect?'] },
  uc6: { title: 'Navigation Compose', url: 'https://android-notebook.netlify.app/android/compose', summary: 'Navigation Compose dùng NavController để navigate giữa composable destinations.', points: ['NavHost định nghĩa graph', 'navigate("route") để chuyển màn', 'popBackStack() để quay lại', 'Type-safe navigation với Kotlin Serialization (2.8+)'], interviewTips: ['Truyền data qua navigation?', 'Deep link trong Navigation Compose?'] },
  uc7: { title: 'Theming', url: 'https://android-notebook.netlify.app/android/compose', summary: 'Material 3 Theming: MaterialTheme với colorScheme, typography, shapes.', points: ['MaterialTheme.colorScheme.primary', 'Dynamic Color (Android 12+)', 'Custom typography với Google Fonts', 'Dark/Light theme switching'], interviewTips: ['Material 2 vs Material 3?', 'Dynamic Color là gì?'] },

  // ── Architecture ──────────────────────────────────────────────────────────
  a1: { title: 'MVC', url: 'https://android-notebook.netlify.app/architecture/patterns', summary: 'MVC: Model-View-Controller. Controller xử lý logic, phổ biến ở web, ít dùng trong Android hiện đại.', points: ['Model: data và business logic', 'View: UI (Activity/Fragment trong Android)', 'Controller = Activity, tạo God class', 'Khó test vì Controller gắn chặt Android'], interviewTips: ['Tại sao MVC không phù hợp Android?'] },
  a2: { title: 'MVP', url: 'https://android-notebook.netlify.app/architecture/patterns', summary: 'MVP: Model-View-Presenter. Presenter xử lý logic, View là passive interface, dễ unit test.', points: ['View implement interface', 'Presenter nhận View interface – dễ mock', 'Trước ViewModel/LiveData, MVP phổ biến', 'Nhược: nhiều boilerplate interface'], interviewTips: ['MVP vs MVVM?'] },
  a3: { title: 'MVVM', url: 'https://android-notebook.netlify.app/architecture/patterns', summary: 'MVVM: Model-View-ViewModel. ViewModel expose state qua StateFlow/LiveData. View observe và render.', points: ['ViewModel không biết View', 'Unidirectional data flow', 'ViewModel survive configuration change', 'Kết hợp tốt với Jetpack và Compose'], interviewTips: ['MVVM trong Android khác MVVM gốc?', 'ViewModel communicate back to View thế nào?'] },
  a4: { title: 'MVI', url: 'https://android-notebook.netlify.app/architecture/patterns', summary: 'MVI: Model-View-Intent. State là immutable, Intent là user action, reducer tính state mới.', points: ['Single source of truth: State object', 'Intent → Reducer → new State', 'Side effects xử lý riêng', 'Dễ debug vì state history rõ ràng'], interviewTips: ['MVI vs MVVM?', 'Khi nào chọn MVI?'] },
  a5: { title: 'Clean Architecture', url: 'https://android-notebook.netlify.app/architecture/clean-architecture', summary: '3 layers: Presentation, Domain, Data. Dependency rule: outer layers depend on inner.', points: ['Domain layer: UseCase, Entity – pure Kotlin', 'Data layer: Repository impl, DataSource', 'Presentation: ViewModel, UI', 'Dependency Inversion qua interfaces'], interviewTips: ['Tại sao Domain layer không có Android dependency?', 'UseCase có thể gộp không?'] },
  a6: { title: 'SOLID', url: 'https://android-notebook.netlify.app/architecture/solid-principles', summary: 'SOLID: 5 principles để code dễ maintain, extend, test.', points: ['S: Single Responsibility', 'O: Open/Closed – open for extension', 'L: Liskov Substitution', 'I: Interface Segregation', 'D: Dependency Inversion'], interviewTips: ['Ví dụ SOLID trong Android code?', 'Principle nào hay vi phạm nhất?'] },
  a7: { title: 'Repository pattern', url: 'https://android-notebook.netlify.app/architecture/clean-architecture', summary: 'Repository abstract data sources (API, DB, cache). ViewModel chỉ biết Repository interface.', points: ['Repository interface trong Domain', 'Impl trong Data layer', 'Cache strategy trong Repository', 'Single source of truth'], interviewTips: ['Repository giúp gì trong testing?'] },
  a8: { title: 'UseCase / Domain', url: 'https://android-notebook.netlify.app/architecture/clean-architecture', summary: 'UseCase chứa business logic đơn lẻ, gọi Repository, trả result cho ViewModel.', points: ['1 UseCase = 1 business action', 'invoke() operator cho clean call', 'Pure Kotlin – dễ unit test', 'Tái sử dụng giữa các ViewModel'], interviewTips: ['UseCase quá nhỏ có ổn không?', 'Khi nào bỏ qua UseCase layer?'] },
  a9: { title: 'Dependency Injection', url: 'https://android-notebook.netlify.app/di/hilt', summary: 'DI cung cấp dependencies từ bên ngoài, giảm coupling, tăng testability.', points: ['Constructor injection > field injection', 'Hilt/Dagger: compile-time DI', 'Koin: runtime DI – DSL đơn giản', 'Manual DI cho project nhỏ'], interviewTips: ['Hilt vs Koin?', 'DI vs Service Locator?'] },

  // ── Jetpack ───────────────────────────────────────────────────────────────
  j1: { title: 'ViewModel', url: 'https://android-notebook.netlify.app/android/components', summary: 'ViewModel lưu UI state qua configuration change, không tham chiếu Activity/Fragment.', points: ['viewModelScope tự cancel khi ViewModel cleared', 'Tạo qua viewModels() delegate', 'SavedStateHandle cho state survive process death', 'Không giữ Context!'], interviewTips: ['ViewModel bị destroy khi nào?', 'ViewModel vs onSaveInstanceState?'] },
  j2: { title: 'LiveData', url: 'https://android-notebook.netlify.app/android/components', summary: 'LiveData là lifecycle-aware observable data holder. Chỉ deliver khi observer STARTED/RESUMED.', points: ['observe() với LifecycleOwner', 'postValue() từ background thread', 'MediatorLiveData combine sources', 'Compose dùng StateFlow thay LiveData'], interviewTips: ['LiveData vs StateFlow?', 'Tại sao LiveData ít dùng trong Compose?'] },
  j3: { title: 'StateFlow', url: 'https://android-notebook.netlify.app/async/coroutines-flow', summary: 'StateFlow là hot flow có initial value, luôn giữ state hiện tại. Thay thế LiveData trong Kotlin.', points: ['collect() trong lifecycle scope', 'collectAsState() trong Compose', 'MutableStateFlow để update', 'So sánh: StateFlow vs SharedFlow'], interviewTips: ['StateFlow vs LiveData trong Compose?'] },
  j4: { title: 'Navigation', url: 'https://android-notebook.netlify.app/android/compose', summary: 'Jetpack Navigation quản lý back stack và navigation giữa destinations.', points: ['NavGraph định nghĩa destinations', 'SafeArgs cho type-safe arguments', 'Deep link support', 'Multiple back stacks (bottom nav)'], interviewTips: ['Navigation Component lợi ích?'] },
  j5: { title: 'Room', url: 'https://android-notebook.netlify.app/android/room', summary: 'Room là ORM layer trên SQLite. @Entity, @Dao, @Database.', points: ['@Entity = table', '@Dao = SQL operations', 'Flow/LiveData từ query tự update', 'Migration khi thay đổi schema'], interviewTips: ['Room vs SQLite trực tiếp?', 'Xử lý migration thế nào?'] },
  j6: { title: 'WorkManager', url: 'https://android-notebook.netlify.app/async/workmanager', summary: 'WorkManager chạy guaranteed background work, kể cả khi app bị kill hoặc device reboot.', points: ['OneTimeWorkRequest vs PeriodicWorkRequest', 'Constraints: network, battery, charging', 'Chain work: then(), combine()', 'Worker vs CoroutineWorker'], interviewTips: ['WorkManager vs Foreground Service?'] },
  j7: { title: 'Paging 3', url: 'https://android-notebook.netlify.app/android/components', summary: 'Paging 3 load data theo trang từ network/DB, tích hợp RecyclerView và Compose.', points: ['PagingSource implement load()', 'RemoteMediator cho network + DB', 'LazyPagingItems trong Compose', 'LoadState để hiện loading/error'], interviewTips: ['Paging 3 vs manual pagination?'] },
  j8: { title: 'DataStore', url: 'https://android-notebook.netlify.app/android/room', summary: 'DataStore thay thế SharedPreferences. Preferences DataStore (key-value) và Proto DataStore (typed).', points: ['Async qua Flow/coroutines', 'Type-safe với Proto DataStore', 'Xử lý exceptions tốt hơn ShrPref', 'Không chặn main thread'], interviewTips: ['DataStore vs SharedPreferences?'] },
  j9: { title: 'Hilt / Dagger', url: 'https://android-notebook.netlify.app/di/hilt', summary: 'Hilt là DI library built on Dagger, tích hợp với Android components.', points: ['@HiltAndroidApp trên Application', '@AndroidEntryPoint trên Activity/Fragment', '@Inject constructor cho auto provide', '@Module, @Provides cho external deps'], interviewTips: ['Hilt scopes: ActivityScoped vs ViewModelScoped?'] },

  // ── Concurrency ───────────────────────────────────────────────────────────
  c1: { title: 'Threading model', url: 'https://android-notebook.netlify.app/async/coroutines-flow', summary: 'Android main thread (UI thread). Background work dùng Coroutines, WorkManager, hoặc threads.', points: ['Main thread: UI update, touch events', 'ANR nếu block main > 5s', 'Dispatchers.IO cho IO work', 'Dispatchers.Default cho CPU-intensive'], interviewTips: ['Tại sao không làm network trên main thread?'] },
  c2: { title: 'Coroutines', url: 'https://android-notebook.netlify.app/async/coroutines-flow', summary: 'Coroutines: lightweight, structured, sequential async code.', points: ['launch vs async', 'suspend fun tự động switch context', 'CoroutineScope lifecycle management', 'Exception handling: try-catch hoặc CoroutineExceptionHandler'], interviewTips: ['Coroutine exception propagation?'] },
  c3: { title: 'Dispatcher', url: 'https://android-notebook.netlify.app/async/coroutines-flow', summary: 'Dispatcher quyết định coroutine chạy trên thread nào.', points: ['Main: UI, Compose state', 'IO: network, disk (64 threads)', 'Default: CPU-heavy computation', 'Unconfined: kế thừa thread caller'], interviewTips: ['Dispatchers.IO vs Default?'] },
  c4: { title: 'Structured concurrency', url: 'https://android-notebook.netlify.app/async/coroutines-flow', summary: 'Structured concurrency: coroutine children không vượt scope cha, cancellation lan truyền.', points: ['CoroutineScope = vòng đời coroutines', 'SupervisorJob: child failure không hủy siblings', 'Cancel tự động khi ViewModel clear', 'Job hierarchy và cancellation'], interviewTips: ['Job vs SupervisorJob?', 'Structured concurrency lợi ích?'] },
  c5: { title: 'Flow cold vs hot', url: 'https://android-notebook.netlify.app/async/coroutines-flow', summary: 'Cold flow: chỉ chạy khi có collector. Hot flow (StateFlow/SharedFlow): chạy kể cả không có collector.', points: ['flow { } = cold', 'StateFlow, SharedFlow = hot', 'Cold: mỗi collector nhận từ đầu', 'Hot: collector nhận từ thời điểm subscribe'], interviewTips: ['Cold vs hot stream ví dụ thực tế?'] },
  c6: { title: 'StateFlow vs SharedFlow', url: 'https://android-notebook.netlify.app/async/coroutines-flow', summary: 'StateFlow: 1 value hiện tại, replay=1. SharedFlow: configurable replay, broadcast.', points: ['StateFlow cần initialValue', 'SharedFlow.replay = số item cache cho collector mới', 'StateFlow dùng cho UI state', 'SharedFlow dùng cho events (one-shot)'], interviewTips: ['Khi nào dùng SharedFlow thay StateFlow?'] },
  c7: { title: 'RxJava basics', url: 'https://android-notebook.netlify.app/async/coroutines-flow', summary: 'RxJava: reactive programming với Observable streams. Ít dùng hơn trong project Kotlin mới.', points: ['Observable, Single, Completable, Maybe', 'subscribeOn / observeOn chuyển thread', 'Operators: map, flatMap, filter', 'Dispose để tránh leak'], interviewTips: ['RxJava vs Coroutines/Flow?'] },

  // ── Networking ────────────────────────────────────────────────────────────
  n1: { title: 'Retrofit', url: 'https://android-notebook.netlify.app/networking/', summary: 'Retrofit là type-safe HTTP client. Define API interface, Retrofit tự generate implementation.', points: ['@GET, @POST, @PUT, @DELETE', '@Query, @Path, @Body, @Header', 'Converter: Gson, Moshi, Kotlin Serialization', 'suspend fun cho coroutines support'], interviewTips: ['Retrofit + OkHttp mối quan hệ?'] },
  n2: { title: 'OkHttp', url: 'https://android-notebook.netlify.app/networking/', summary: 'OkHttp là HTTP client underlying Retrofit. Xử lý connection pooling, caching, interceptors.', points: ['Interceptor: logging, auth token injection', 'Connection pooling tái sử dụng connections', 'Response caching với Cache', 'Certificate pinning cho security'], interviewTips: ['Viết Interceptor thêm auth header?'] },
  n3: { title: 'WebSocket', url: 'https://android-notebook.netlify.app/networking/', summary: 'WebSocket cho real-time bidirectional communication. OkHttp hỗ trợ WebSocket natively.', points: ['newWebSocket() tạo kết nối', 'WebSocketListener for events', 'send() gửi message', 'close() / reconnect strategy'], interviewTips: ['WebSocket vs HTTP polling?'] },
  n4: { title: 'Serialization', url: 'https://android-notebook.netlify.app/networking/', summary: 'JSON serialization: Gson, Moshi, kotlinx.serialization. Chuyển đổi JSON ↔ Kotlin objects.', points: ['kotlinx.serialization: compile-time, type-safe', 'Moshi: fast, Kotlin friendly', 'Gson: phổ biến, không hỗ trợ tốt Kotlin', '@SerialName đổi tên field'], interviewTips: ['Gson vs Moshi vs kotlinx.serialization?'] },
  n5: { title: 'Error handling', url: 'https://android-notebook.netlify.app/networking/', summary: 'Xử lý network errors: HTTP errors, IOException, timeout. Dùng sealed class Result để wrap.', points: ['Response.isSuccessful check HTTP status', 'HttpException cho HTTP error codes', 'IOException cho network failures', 'Result<T> hoặc sealed class wrap response'], interviewTips: ['Pattern xử lý API error trong production?'] },
  n6: { title: 'Retry strategy', url: 'https://android-notebook.netlify.app/networking/', summary: 'Retry mechanism: exponential backoff, max retries, retry on specific errors.', points: ['OkHttp Interceptor tự retry', 'Coroutine retry với delay', 'Exponential backoff: 1s, 2s, 4s...', 'Jitter để tránh thundering herd'], interviewTips: ['Exponential backoff là gì?'] },
  n7: { title: 'Caching strategy', url: 'https://android-notebook.netlify.app/networking/', summary: 'HTTP caching với OkHttp Cache. Cache-Control headers. Room làm offline cache.', points: ['OkHttp Cache với disk cache', 'Cache-Control: max-age, no-cache', 'Room làm single source of truth', 'ETag / Last-Modified conditional requests'], interviewTips: ['Offline-first architecture?'] },

  // ── Storage ───────────────────────────────────────────────────────────────
  s1: { title: 'SharedPreferences', url: 'https://android-notebook.netlify.app/android/room', summary: 'SharedPreferences lưu key-value nhỏ. Deprecated bởi DataStore vì API synchronous và không safe.', points: ['edit().putString().apply()', 'apply() async, commit() sync', 'Không dùng cho sensitive data', 'Thay thế bằng DataStore'], interviewTips: ['SharedPreferences vs DataStore?'] },
  s2: { title: 'DataStore', url: 'https://android-notebook.netlify.app/android/room', summary: 'DataStore: async, safe, Flow-based replacement cho SharedPreferences.', points: ['Preferences DataStore: key-value', 'Proto DataStore: typed với protobuf', 'Không block main thread', 'Exception handling tốt hơn'], interviewTips: ['Ưu điểm DataStore vs SharedPreferences?'] },
  s3: { title: 'Room', url: 'https://android-notebook.netlify.app/android/room', summary: 'Room Database: SQLite wrapper với compile-time query validation, Flow support.', points: ['@Database, @Entity, @Dao', 'Compile-time SQL verification', 'TypeConverter cho custom types', 'Migration với addMigrations()'], interviewTips: ['Room migration thất bại thì sao?'] },
  s4: { title: 'SQLite', url: 'https://android-notebook.netlify.app/android/room', summary: 'SQLite là relational DB embedded trong Android. Room là recommended wrapper.', points: ['SQLiteOpenHelper cho raw SQLite', 'Cursor để đọc query results', 'Transactions cho atomic operations', 'Room abstract hoàn toàn'], interviewTips: ['Khi nào dùng SQLite raw thay Room?'] },
  s5: { title: 'File storage', url: 'https://android-notebook.netlify.app/android/room', summary: 'Android file storage: Internal storage (private), External storage (public/scoped).', points: ['getFilesDir(): internal private', 'getExternalFilesDir(): scoped external', 'Scoped Storage (Android 10+)', 'MediaStore API cho media files'], interviewTips: ['Scoped Storage thay đổi gì từ Android 10?'] },
  s6: { title: 'Cache management', url: 'https://android-notebook.netlify.app/android/room', summary: 'Cache giảm network request. Disk cache (OkHttp), memory cache (LruCache), image cache (Coil/Glide).', points: ['getCacheDir(): bộ nhớ cache, hệ thống xóa khi cần', 'LruCache cho in-memory caching', 'DiskLruCache qua OkHttp', 'Coil/Glide quản lý image cache tự động'], interviewTips: ['LRU cache hoạt động thế nào?'] },

  // ── Performance ───────────────────────────────────────────────────────────
  p1: { title: 'Memory leak', url: 'https://android-notebook.netlify.app/android/components', summary: 'Memory leak: object không được GC vì còn reference. Phổ biến: Context leak, static reference, inner class.', points: ['LeakCanary phát hiện leak', 'Tránh giữ Activity trong singleton', 'WeakReference cho optional reference', 'Unregister listener trong onDestroy'], interviewTips: ['Common memory leak patterns trong Android?'] },
  p2: { title: 'ANR', url: 'https://android-notebook.netlify.app/android/components', summary: 'ANR (App Not Responding): main thread bị block > 5s (Activity) hoặc 10s (Broadcast).', points: ['Không làm IO/network trên main thread', 'StrictMode phát hiện vi phạm', 'ANR từ deadlock hoặc long computation', 'Profiler theo dõi main thread'], interviewTips: ['Nguyên nhân ANR thường gặp?'] },
  p3: { title: 'UI rendering', url: 'https://android-notebook.netlify.app/android/components', summary: '60fps = 16ms/frame. Jank khi frame miss. Tối ưu: flat hierarchy, hardware acceleration, overdraw reduction.', points: ['GPU Overdraw checker trong Developer Options', 'Tracer for OpenGL ES', 'Compose: tránh unnecessary recomposition', 'RecyclerView: offscreen item limit'], interviewTips: ['Jank là gì và cách tránh?'] },
  p4: { title: 'App startup optimization', url: 'https://android-notebook.netlify.app/android/components', summary: 'Giảm cold start time: lazy init, App Startup library, baseline profile.', points: ['App Startup: thứ tự init components', 'Baseline Profile: AOT compilation', 'Lazy load heavy dependencies', 'Splash Screen API (Android 12+)'], interviewTips: ['Cold start vs warm start vs hot start?'] },
  p5: { title: 'Lazy loading', url: 'https://android-notebook.netlify.app/android/components', summary: 'Lazy loading: chỉ load data/UI khi cần. Paging 3 cho list, lazy { } cho Kotlin, LazyColumn trong Compose.', points: ['Paging 3 load theo trang', 'LazyColumn/LazyRow trong Compose', 'Coil lazy load image', 'Kotlin lazy delegate'], interviewTips: ['Lazy loading trong Compose vs RecyclerView?'] },
  p6: { title: 'Bitmap optimization', url: 'https://android-notebook.netlify.app/android/components', summary: 'Bitmap tốn nhiều memory. Dùng Coil/Glide để cache, resize, và load hiệu quả.', points: ['inSampleSize để scale down khi decode', 'Coil/Glide tự handle lifecycle + cache', 'Bitmap.recycle() khi không dùng (ít cần với GC)', 'Use appropriate image format (WebP)'], interviewTips: ['OOM từ Bitmap xảy ra thế nào?'] },
  p7: { title: 'Profiling tools', url: 'https://android-notebook.netlify.app/android/components', summary: 'Android Studio Profiler: CPU, Memory, Network, Battery profiler.', points: ['CPU Profiler: method traces, callstacks', 'Memory Profiler: heap dump, allocation', 'Network Profiler: request/response', 'Systrace / Perfetto cho system-level'], interviewTips: ['Cách profil memory leak?'] },

  // ── Testing ───────────────────────────────────────────────────────────────
  t1: { title: 'Unit test', url: 'https://android-notebook.netlify.app/android/components', summary: 'Unit test kiểm tra 1 unit code (function/class) độc lập với dependencies.', points: ['JUnit 4/5 framework', 'Assert: assertEquals, assertTrue...', 'Arrange-Act-Assert pattern', 'Fast, no Android dependency'], interviewTips: ['Unit test vs integration test?'] },
  t2: { title: 'Integration test', url: 'https://android-notebook.netlify.app/android/components', summary: 'Integration test kiểm tra nhiều component kết hợp. Chạy trên device/emulator hoặc Robolectric.', points: ['AndroidJUnit4 runner', 'Robolectric: JVM với Android env giả', 'Room in-memory DB cho DB tests', 'Hilt testing support'], interviewTips: ['Robolectric vs Instrumented test?'] },
  t3: { title: 'UI test', url: 'https://android-notebook.netlify.app/android/components', summary: 'UI test (Espresso, Compose Testing) tương tác UI và verify visual state.', points: ['Espresso: onView().perform().check()', 'Compose: composeTestRule.onNodeWithText()', 'ComposeTestRule cho Compose UI tests', 'IdlingResource cho async UI waits'], interviewTips: ['Espresso vs Compose Testing?'] },
  t4: { title: 'Mockk / Mockito', url: 'https://android-notebook.netlify.app/android/components', summary: 'Mocking cho dependencies trong unit tests. MockK cho Kotlin, Mockito cho Java/Kotlin.', points: ['MockK: every { } và verify { }', 'Mockito: when().thenReturn()', 'MockK tốt hơn với Kotlin features', 'Spy cho partial mock'], interviewTips: ['MockK vs Mockito?', 'Mock vs Stub vs Spy?'] },
  t5: { title: 'Coroutine testing', url: 'https://android-notebook.netlify.app/async/coroutines-flow', summary: 'Test coroutines với kotlinx-coroutines-test: TestCoroutineDispatcher, runTest, advanceTimeBy.', points: ['runTest thay runBlocking cho tests', 'TestCoroutineDispatcher control time', 'advanceUntilIdle() chạy hết pending', 'Turbine library test Flow'], interviewTips: ['Cách test suspend function?'] },
  t6: { title: 'TDD', url: 'https://android-notebook.netlify.app/android/components', summary: 'TDD: Test-Driven Development. Write failing test → implement → refactor (Red-Green-Refactor).', points: ['Write test trước implementation', 'Test forces good design', 'Nhược: chậm ban đầu, khó với UI', 'BDD mở rộng với Given-When-Then'], interviewTips: ['TDD lợi ích trong thực tế?'] },

  // ── Build & Release ───────────────────────────────────────────────────────
  b1: { title: 'Gradle', url: 'https://android-notebook.netlify.app/android/components', summary: 'Gradle là build system của Android. build.gradle.kts (KTS) là format mới.', points: ['app/build.gradle.kts: dependencies, compileSdk', 'Version catalog (libs.versions.toml)', 'buildSrc hoặc convention plugins', 'Gradle task graph và caching'], interviewTips: ['Gradle sync vs build?', 'Cách optimize Gradle build?'] },
  b2: { title: 'Build variants', url: 'https://android-notebook.netlify.app/android/components', summary: 'Build variants = Build Type x Product Flavor. debug, release là 2 build types mặc định.', points: ['debug: debuggable, không obfuscate', 'release: minified, signed', 'buildConfigField thêm constants', 'signingConfig cho release build'], interviewTips: ['Sự khác biệt debug vs release build?'] },
  b3: { title: 'Product flavors', url: 'https://android-notebook.netlify.app/android/components', summary: 'Product flavors tạo nhiều variants của app (free/paid, staging/production).', points: ['flavorDimensions: dimension grouping', 'applicationIdSuffix khác bundle ID', 'Source sets per flavor', 'Flavor-specific resources và code'], interviewTips: ['Dùng flavors cho environment thế nào?'] },
  b4: { title: 'Proguard / R8', url: 'https://android-notebook.netlify.app/android/components', summary: 'R8 (thay Proguard): shrink, obfuscate, optimize code cho release build.', points: ['minifyEnabled true trong release', 'proguard-rules.pro: keep rules', 'Keep rules cho reflection, serialization', 'Mapping file để deobfuscate crash'], interviewTips: ['Tại sao cần keep rules?', 'R8 vs Proguard?'] },
  b5: { title: 'App signing', url: 'https://android-notebook.netlify.app/android/components', summary: 'APK/AAB phải ký bằng keystore trước khi publish. Google Play App Signing quản lý key.', points: ['Keystore file chứa private key', 'signingConfig trong build.gradle', 'Google Play App Signing: Google giữ key', 'Upload key vs App signing key'], interviewTips: ['Mất keystore thì sao?', 'Google Play App Signing là gì?'] },
  b6: { title: 'CI/CD', url: 'https://android-notebook.netlify.app/android/components', summary: 'CI/CD tự động hoá build, test, deploy. Phổ biến: GitHub Actions, Bitrise, CircleCI, Fastlane.', points: ['GitHub Actions: workflow YAML', 'Fastlane: lane, gym, supply', 'Tự động run tests trên mỗi PR', 'Deploy AAB lên Play Store tự động'], interviewTips: ['CI/CD pipeline cơ bản cho Android?'] },

  // ── Advanced / Senior ─────────────────────────────────────────────────────
  ad1: { title: 'Modularization', url: 'https://android-notebook.netlify.app/android/components', summary: 'Chia app thành modules độc lập: :app, :feature:home, :core:network, :core:ui, :core:data.', points: ['Feature modules: :feature:login, :feature:home', 'Core modules: shared code', 'Tăng build speed (parallel build)', 'API module tránh leak implementation details'], interviewTips: ['Lợi ích modularization?', 'Mô hình module phổ biến?'] },
  ad2: { title: 'Dynamic feature modules', url: 'https://android-notebook.netlify.app/android/components', summary: 'Dynamic Delivery: download feature on-demand sau khi install, giảm APK size ban đầu.', points: ['Play Feature Delivery', 'SplitInstallManager để install on demand', 'onDemand vs onInstall vs conditional', 'Phù hợp cho feature ít người dùng'], interviewTips: ['Dynamic feature vs standard module?'] },
  ad3: { title: 'Multi-module architecture', url: 'https://android-notebook.netlify.app/android/components', summary: 'Architecture cho multi-module: navigation graph giữa features, DI setup với Hilt subcomponents.', points: ['Navigation giữa feature modules', 'Shared ViewModel qua navigation graph', 'Hilt: @InstallIn module scope', 'Avoiding circular dependencies'], interviewTips: ['Vấn đề thường gặp với multi-module?'] },
  ad4: { title: 'System design Android', url: 'https://android-notebook.netlify.app/android/components', summary: 'Android system design: offline-first, real-time sync, pagination, caching strategies.', points: ['Offline-first với Room + WorkManager', 'Real-time với WebSocket/Firebase', 'Optimistic UI updates', 'Conflict resolution khi sync'], interviewTips: ['Design offline-first chat app?'] },
  ad5: { title: 'Large scale architecture', url: 'https://android-notebook.netlify.app/android/components', summary: 'Architecture cho app lớn: convention plugins, version catalog, shared module patterns.', points: ['Convention plugins chuẩn hoá build config', 'libs.versions.toml version catalog', 'Composable build logic', 'Dependency management tập trung'], interviewTips: ['Scalability concerns cho Android team lớn?'] },
  ad6: { title: 'Security (encryption, obfuscation)', url: 'https://android-notebook.netlify.app/android/components', summary: 'Android security: EncryptedSharedPreferences, Android Keystore, Certificate pinning, R8 obfuscation.', points: ['Android Keystore: lưu key an toàn', 'EncryptedSharedPreferences / EncryptedFile', 'Certificate pinning chống MITM', 'Biometric authentication API'], interviewTips: ['Lưu trữ token an toàn thế nào?'] },
  ad7: { title: 'Play Store optimization', url: 'https://android-notebook.netlify.app/android/components', summary: 'ASO (App Store Optimization), Android App Bundle, Play Asset Delivery, In-App Review.', points: ['AAB thay APK cho Play Store', 'Play Asset Delivery cho lớn assets', 'In-App Review API', 'Core App Quality guidelines'], interviewTips: ['AAB vs APK lợi ích?'] },

  // ── Design Patterns ────────────────────────────────────────────────────────
  dp1: {
    title: 'Singleton',
    summary: 'Đảm bảo chỉ có một instance duy nhất của class tồn tại trong toàn bộ ứng dụng.',
    points: ['Database connection', 'Logger', 'Config manager', 'Room DB'],
    code: `object DatabaseManager {
    fun connect() { /* ... */ }
    fun query(sql: String) { /* ... */ }
}`,
    interviewTips: ['Khi nào dùng Singleton?', 'Vấn đề thread-safe trong Singleton?']
  },
  dp2: {
    title: 'Builder',
    summary: 'Xây dựng object phức tạp theo từng bước, tách rời quá trình tạo khỏi representation.',
    points: ['AlertDialog', 'OkHttpClient', 'Retrofit', 'Notification'],
    code: `val dialog = AlertDialog.Builder(context)
    .setTitle("Tiêu đề")
    .setMessage("Nội dung")
    .setPositiveButton("OK") { _, _ -> }
    .build()`,
    interviewTips: ['Builder vs Factory?', 'Tại sao dùng Builder thay vì constructor nhiều tham số?']
  },
  dp3: {
    title: 'Factory Method',
    summary: 'Định nghĩa interface tạo object, để subclass quyết định class nào được tạo.',
    points: ['ViewModel Factory', 'Cross-platform UI', 'Plugin system'],
    code: `abstract class Dialog {
    abstract fun createButton(): Button
}
class WindowsDialog : Dialog() {
    override fun createButton() = WindowsButton()
}`,
    interviewTips: ['Factory Method giải quyết vấn đề gì?']
  },
  dp4: {
    title: 'Abstract Factory',
    summary: 'Tạo ra họ các object liên quan mà không chỉ định class cụ thể.',
    points: ['Dark/Light theme', 'Cross-platform', 'UI component family'],
    code: `interface UIFactory {
    fun createButton(): Button
    fun createCheckbox(): Checkbox
}
class DarkThemeFactory : UIFactory { /*...*/ }`,
    interviewTips: ['Abstract Factory vs Factory Method?']
  },
  dp5: {
    title: 'Prototype',
    summary: 'Clone object hiện tại thay vì tạo mới, hữu ích khi khởi tạo object tốn chi phí cao.',
    points: ['Copy objects', 'Game entities', 'Config templates'],
    code: `data class UserConfig(
    val theme: String,
    val locale: String
)
val copy = config.copy(theme = "dark")`,
    interviewTips: ['Deep copy vs Shallow copy?']
  },
  dp6: {
    title: 'Adapter',
    summary: 'Chuyển đổi interface của class sang interface khác mà client mong đợi.',
    points: ['RecyclerView.Adapter', '3rd party lib', 'Legacy code'],
    code: `class ItemAdapter(
    private val items: List<Item>
) : RecyclerView.Adapter<ViewHolder>() {
    override fun getItemCount() = items.size
}`,
    interviewTips: ['Adapter pattern trong Android?']
  },
  dp7: {
    title: 'Decorator',
    summary: 'Thêm behavior mới vào object tại runtime bằng cách wrap nó, không thay đổi class gốc.',
    points: ['Java I/O Streams', 'Middleware', 'Logging wrapper'],
    code: `val stream = BufferedInputStream(
    FileInputStream("data.txt")
)
// BufferedInputStream "decorates" FileInputStream`,
    interviewTips: ['Decorator vs Inheritance?']
  },
  dp8: {
    title: 'Facade',
    summary: 'Cung cấp interface đơn giản cho một hệ thống con phức tạp — che giấu sự phức tạp bên trong.',
    points: ['Repository', 'SDK wrapper', 'Service layer'],
    code: `class MediaFacade {
    private val player = MediaPlayer()
    private val buffer = BufferManager()
    fun play(url: String) {
        buffer.prepare(url); player.start()
    }
}`,
    interviewTips: ['Facade giúp gì trong thiết kế hệ thống?']
  },
  dp9: {
    title: 'Proxy',
    summary: 'Cung cấp đối tượng thay thế để kiểm soát truy cập — lazy loading, caching, access control.',
    points: ['Retrofit interface', 'Lazy loading', 'Auth guard', 'Cache proxy'],
    code: `interface ApiService {
    suspend fun getUsers(): List<User>
}
// Retrofit tạo Proxy implement ApiService
val api = retrofit.create(ApiService::class.java)`,
    interviewTips: ['Proxy vs Facade?']
  },
  dp10: {
    title: 'Composite',
    summary: 'Xử lý object đơn lẻ và nhóm object theo cách thống nhất — cấu trúc cây.',
    points: ['View hierarchy', 'File system', 'Menu tree'],
    code: `// Android: ViewGroup là Composite của View
val layout = LinearLayout(context)
layout.addView(TextView(context))
layout.addView(ImageView(context))
// draw() gọi đệ quy xuống toàn bộ cây`,
    interviewTips: ['Composite pattern ứng dụng trong Android UI?']
  },
  dp11: {
    title: 'Bridge',
    summary: 'Tách abstraction khỏi implementation để cả hai có thể thay đổi độc lập nhau.',
    points: ['Multi-platform renderer', 'Device drivers', 'Remote/Local data'],
    code: `interface Renderer { fun render(shape: Shape) }
class OpenGLRenderer : Renderer { /*...*/ }
class VulkanRenderer  : Renderer { /*...*/ }
class Circle(val renderer: Renderer) : Shape()`,
    interviewTips: ['Bridge pattern giúp gì cho đa nền tảng?']
  },
  dp12: {
    title: 'Observer',
    summary: 'Một object thay đổi → thông báo tự động đến tất cả các object đang theo dõi nó.',
    points: ['LiveData', 'StateFlow', 'RxJava', 'EventBus'],
    code: `viewModel.uiState
    .collect { state ->
        updateUI(state)
    }
// StateFlow là Observer pattern`,
    interviewTips: ['Observer pattern vs Callback?', 'Memory leak trong Observer?']
  },
  dp13: {
    title: 'Strategy',
    summary: 'Định nghĩa một họ thuật toán, đóng gói từng cái, cho phép hoán đổi linh hoạt tại runtime.',
    points: ['Payment methods', 'Sort algorithms', 'Compression'],
    code: `interface SortStrategy {
    fun sort(data: List<Int>): List<Int>
}
class Sorter(var strategy: SortStrategy) {
    fun sort(d: List<Int>) = strategy.sort(d)
}`,
    interviewTips: ['Strategy vs State pattern?']
  },
  dp14: {
    title: 'Command',
    summary: 'Đóng gói request như một object — hỗ trợ undo/redo, queue, logging các action.',
    points: ['Undo/Redo', 'Transaction', 'Macro recording', 'Task queue'],
    code: `interface Command {
    fun execute()
    fun undo()
}
class DeleteTextCommand : Command {
    override fun execute() { /* xóa */ }
    override fun undo() { /* khôi phục */ }
}`,
    interviewTips: ['Command pattern trong WorkManager?']
  },
  dp15: {
    title: 'Chain of Responsibility',
    summary: 'Truyền request qua chuỗi handler cho đến khi có handler xử lý được.',
    points: ['OkHttp Interceptor', 'Touch events', 'Middleware'],
    code: `// OkHttp Interceptor là Chain of Responsibility
client = OkHttpClient.Builder()
    .addInterceptor(AuthInterceptor())
    .addInterceptor(LoggingInterceptor())
    .addInterceptor(CacheInterceptor())
    .build()`,
    interviewTips: ['Chain of Responsibility trong Android Touch Event?']
  },
  dp16: {
    title: 'Template Method',
    summary: 'Định nghĩa skeleton của thuật toán trong base class, để subclass override các bước cụ thể.',
    points: ['Activity lifecycle', 'Data export', 'Report generator'],
    code: `abstract class DataExporter {
    fun export() { read(); process(); write() }
    abstract fun read()
    abstract fun write()
    open fun process() { /* default impl */ }
}`,
    interviewTips: ['Template Method vs Strategy?']
  },
  dp17: {
    title: 'State',
    summary: 'Object thay đổi behavior dựa trên state nội tại — như máy trạng thái (FSM).',
    points: ['Media player', 'UI State Machine', 'Order status'],
    code: `sealed class UiState {
    object Loading : UiState()
    data class Success(val data: List<Item>) : UiState()
    data class Error(val msg: String) : UiState()
}`,
    interviewTips: ['State pattern giúp gì cho UI logic?']
  },
  dp18: {
    title: 'Iterator',
    summary: 'Cung cấp cách tuần tự truy cập các phần tử mà không expose cấu trúc bên trong.',
    points: ['for-each', 'Kotlin Iterable', 'Custom collection'],
    code: `class NumberRange(val from: Int, val to: Int) : Iterable<Int> {
    override fun iterator() = (from..to).iterator()
}
for (n in NumberRange(1, 5)) println(n)`,
    interviewTips: ['Iterator pattern lợi ích?']
  },
  dp19: {
    title: 'Mediator',
    summary: 'Giảm sự phụ thuộc trực tiếp giữa các object bằng cách giao tiếp qua một đối tượng trung gian.',
    points: ['Chat room', 'Air traffic control', 'EventBus'],
    code: `class EventBus {
    private val listeners = mutableMapOf<String, MutableList<() -> Unit>>()
    fun emit(event: String) = listeners[event]?.forEach { it() }
}`,
    interviewTips: ['Mediator vs Observer?']
  },
};
