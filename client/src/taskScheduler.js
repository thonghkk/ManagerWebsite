// ─── Timeline Daily Task Tracking ────────────────────────────────
export class TaskSchedulerController {
  constructor(hubId) {
    this.hubId = hubId;
    this.tasks = [];
    this.selectedDate = this.getTodayStr();
    this.currentMonth = new Date();
    this.overviewFilter = 'all'; // 'all' | 'todo' | 'in_progress' | 'done'
    this.container = document.getElementById('content-area');
  }

  // Helpers ─────────────────────────────────────────────────────────
  getTodayStr() {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().split('T')[0];
  }

  getCurrentTimeStr() {
    const now = new Date();
    return `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
  }

  // Returns 'active' | 'past' | 'upcoming' | 'none'
  // Uses daily_schedule[dateStr] for per-day time
  getTaskTimeStatus(task, dateStr) {
    const sched = (task.daily_schedule || {})[dateStr];
    if (!sched || !sched.start || !sched.end) return 'none';
    const now = this.getCurrentTimeStr();
    if (now >= sched.start && now <= sched.end) return 'active';
    if (now > sched.end) return 'past';
    return 'upcoming';
  }

  getDaysDiff(start, end) {
    const s = new Date(start + 'T00:00:00');
    const e = new Date(end + 'T00:00:00');
    return Math.round((e - s) / (1000 * 60 * 60 * 24));
  }

  getTasksForDay(dateStr) {
    return this.tasks.filter(t =>
      t.start_date && t.end_date &&
      t.start_date <= dateStr && t.end_date >= dateStr
    );
  }

  // Progress = done scheduled days / total scheduled days
  // If no daily_schedule set at all → fall back to total days in range
  getTaskProgress(task) {
    const ds = task.daily_schedule || {};
    const dp = task.daily_progress || {};

    const scheduledDates = Object.entries(ds)
      .filter(([, s]) => s && s.start && s.end)
      .map(([d]) => d);

    if (scheduledDates.length === 0) {
      // Fallback: iterate date range
      const totalDays = this.getDaysDiff(task.start_date, task.end_date) + 1;
      const doneDays = Object.values(dp).filter(Boolean).length;
      return { done: doneDays, total: totalDays, pct: Math.round((doneDays / totalDays) * 100) };
    }

    const doneDays = scheduledDates.filter(d => dp[d] === true).length;
    const pct = Math.round((doneDays / scheduledDates.length) * 100);
    return { done: doneDays, total: scheduledDates.length, pct };
  }

  formatDateLabel(dateStr) {
    const d = new Date(dateStr + 'T00:00:00');
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()} ${d.getFullYear()}`;
  }

  // Init ────────────────────────────────────────────────────────────
  async init() {
    this.container.innerHTML = this.getShellHTML();
    this.bindStaticEvents();
    await this.loadTasks();
    this.render();
  }

  getShellHTML() {
    return `
      <div class="ts-root">
        <div class="ts-header">
          <div class="ts-header-brand">
            <button class="ts-home-btn" id="btn-home" title="Back to Dashboard">
              ←
            </button>
            <span class="ts-header-icon">📅</span>
            <div>
              <div class="ts-header-title">Timeline Tracker</div>
              <div class="ts-header-sub">Daily task completion calendar</div>
            </div>
          </div>
          <button class="btn-primary ts-add-btn" id="btn-add-task">+ Add Task</button>
        </div>

        <div class="ts-body">
          <!-- Left: Calendar + Overview -->
          <div class="ts-left-panel">
            <div class="ts-calendar-card">
              <div class="ts-cal-nav">
                <button class="ts-nav-btn" id="cal-prev">‹</button>
                <span class="ts-cal-month-label" id="cal-month-label"></span>
                <button class="ts-nav-btn" id="cal-next">›</button>
              </div>
              <div class="ts-cal-header">
                <span>Su</span><span>Mo</span><span>Tu</span><span>We</span>
                <span>Th</span><span>Fr</span><span>Sa</span>
              </div>
              <div class="ts-cal-grid" id="cal-grid"></div>
            </div>

            <div class="ts-overview-card" id="ts-task-overview"></div>
          </div>

          <!-- Right: Day Detail -->
          <div class="ts-day-panel">
            <div class="ts-day-header" id="ts-day-header"></div>
            <div class="ts-day-tasks" id="ts-day-tasks"></div>
          </div>
        </div>
      </div>
    `;
  }

  bindStaticEvents() {
    document.getElementById('btn-add-task').addEventListener('click', () => this.openTaskModal());

    // Home button — back to Dashboard
    document.getElementById('btn-home').addEventListener('click', async () => {
      const { showDashboard } = await import('./ui/dashboard.js');
      this.container.innerHTML = ''; // clean up task scheduler
      showDashboard();
    });

    document.getElementById('cal-prev').addEventListener('click', () => {
      this.currentMonth.setMonth(this.currentMonth.getMonth() - 1);
      this.renderCalendar();
    });
    document.getElementById('cal-next').addEventListener('click', () => {
      this.currentMonth.setMonth(this.currentMonth.getMonth() + 1);
      this.renderCalendar();
    });
    document.getElementById('modal-task').addEventListener('click', e => {
      if (e.target === document.getElementById('modal-task')) this.closeTaskModal();
    });
  }

  async loadTasks() {
    try {
      const resp = await fetch(`/api/tasks?hub=${this.hubId}`);
      if (resp.ok) this.tasks = await resp.json();
    } catch (e) {
      console.error('Failed to load tasks', e);
    }
  }

  render() {
    this.renderCalendar();
    this.renderDayPanel();
    this.renderTaskOverview();
  }

  // Calendar ────────────────────────────────────────────────────────
  renderCalendar() {
    const year = this.currentMonth.getFullYear();
    const month = this.currentMonth.getMonth();
    const monthNames = ['January','February','March','April','May','June',
                        'July','August','September','October','November','December'];

    document.getElementById('cal-month-label').textContent = `${monthNames[month]} ${year}`;

    const firstDOW = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = this.getTodayStr();
    const grid = document.getElementById('cal-grid');
    grid.innerHTML = '';

    for (let i = 0; i < firstDOW; i++) {
      const pad = document.createElement('div');
      pad.className = 'ts-cal-cell empty';
      grid.appendChild(pad);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${year}-${String(month + 1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
      const dayTasks = this.getTasksForDay(dateStr);
      
      // Filter out tasks that are skipped on this date (no schedule)
      const scheduledTasks = dayTasks.filter(t => {
        const s = t.daily_schedule && t.daily_schedule[dateStr];
        return s && s.start && s.end;
      });

      const cell = document.createElement('div');
      cell.className = 'ts-cal-cell';
      if (dateStr === today) cell.classList.add('today');
      if (dateStr === this.selectedDate) cell.classList.add('selected');

      // Dots: one per scheduled task, green if done that day, else colored
      const dots = scheduledTasks.slice(0, 4).map(t => {
        const done = t.daily_progress && t.daily_progress[dateStr];
        return `<span class="ts-dot ${done ? 'done' : 'pending'}"></span>`;
      }).join('');

      const hasAny = scheduledTasks.length > 0;
      cell.innerHTML = `
        <span class="ts-cal-num">${d}</span>
        <span class="ts-cal-dots">${dots}</span>
      `;
      if (hasAny) cell.classList.add('has-tasks');

      cell.addEventListener('click', () => {
        this.selectedDate = dateStr;
        this.renderCalendar();
        this.renderDayPanel();
      });

      grid.appendChild(cell);
    }
  }

  // Day Panel ───────────────────────────────────────────────────────
  renderDayPanel() {
    const today = this.getTodayStr();
    const isToday = this.selectedDate === today;
    const isPast = this.selectedDate < today;
    let dayTasks = this.getTasksForDay(this.selectedDate);

    // Sort tasks: Scheduled ones first (by start time), then skipped ones
    dayTasks.sort((a, b) => {
      const sA = a.daily_schedule && a.daily_schedule[this.selectedDate];
      const sB = b.daily_schedule && b.daily_schedule[this.selectedDate];
      const aHas = sA && sA.start && sA.end;
      const bHas = sB && sB.start && sB.end;

      if (aHas && bHas) {
        // Both scheduled: sort by start time ascending
        return sA.start.localeCompare(sB.start);
      }
      if (aHas && !bHas) return -1;
      if (!aHas && bHas) return 1;
      return 0; // Both skipped
    });

    const scheduledCount = dayTasks.filter(t => {
      const s = t.daily_schedule && t.daily_schedule[this.selectedDate];
      return s && s.start && s.end;
    }).length;

    // Header
    const header = document.getElementById('ts-day-header');
    const d = new Date(this.selectedDate + 'T00:00:00');
    const dayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    let badge = '';
    if (isToday) badge = '<span class="ts-today-badge">Today</span>';
    else if (isPast) badge = '<span class="ts-past-badge">🔒 Past</span>';

    header.innerHTML = `
      <div class="ts-day-date-block">
        <div class="ts-day-num ${isPast ? 'past' : ''}">${d.getDate()}</div>
        <div class="ts-day-info">
          <div class="ts-day-name">${dayNames[d.getDay()]} ${badge}</div>
          <div class="ts-day-month">${monthNames[d.getMonth()]} ${d.getFullYear()}</div>
        </div>
      </div>
      <div class="ts-day-summary">
        ${isPast ? '<span class="ts-past-note">🔒 Read-only</span>' : `${scheduledCount} scheduled task${scheduledCount !== 1 ? 's' : ''}`}
      </div>
    `;

    // Tasks
    const container = document.getElementById('ts-day-tasks');
    if (dayTasks.length === 0) {
      container.innerHTML = `
        <div class="ts-empty-day">
          <div class="ts-empty-icon">🗓️</div>
          <div class="ts-empty-text">No tasks on this day</div>
          <div class="ts-empty-sub">Add a task that spans this date, or pick another day</div>
        </div>
      `;
      return;
    }

    // ── Gantt Chart ──
    const scheduledTasksForGantt = dayTasks.filter(t => {
      const s = t.daily_schedule && t.daily_schedule[this.selectedDate];
      return s && s.start && s.end;
    });

    let ganttHTML = '';
    if (scheduledTasksForGantt.length > 0) {
      let minHour = 24, maxHour = 0;
      scheduledTasksForGantt.forEach(t => {
        const s = t.daily_schedule[this.selectedDate];
        const sh = parseInt(s.start.split(':')[0], 10);
        const eh = parseInt(s.end.split(':')[0], 10) + (s.end.split(':')[1] === '00' ? 0 : 1);
        if (sh < minHour) minHour = sh;
        if (eh > maxHour) maxHour = eh;
      });
      if (minHour > 0) minHour -= 1;
      if (maxHour < 24) maxHour += 1;
      const totalSpan = maxHour - minHour;
      
      let gridLines = '';
      if (totalSpan > 0) {
        for (let i = 0; i <= totalSpan; i++) {
          const h = minHour + i;
          let label = `${String(h).padStart(2,'0')}:00`;
          gridLines += `<div class="ts-gantt-grid-line" style="left: ${(i / totalSpan) * 100}%"><span class="ts-gantt-label">${label}</span></div>`;
        }
      }

      let bars = scheduledTasksForGantt.map((t, idx) => {
        const s = t.daily_schedule[this.selectedDate];
        const timeStatus = isToday ? this.getTaskTimeStatus(t, this.selectedDate) : 'none';
        const isActive = isToday && timeStatus === 'active';
        const isTimeLocked = isToday && timeStatus === 'past';
        const isLckd = isPast || isTimeLocked;

        const sh = parseInt(s.start.split(':')[0], 10) + parseInt(s.start.split(':')[1], 10)/60;
        const eh = parseInt(s.end.split(':')[0], 10) + parseInt(s.end.split(':')[1], 10)/60;
        
        let leftPct = 0, widthPct = 100;
        if (totalSpan > 0) {
          leftPct = ((sh - minHour) / totalSpan) * 100;
          widthPct = ((eh - sh) / totalSpan) * 100;
        }
        
        let barClass = 'ts-gantt-bar';
        if (isActive) barClass += ' active';
        else if (isLckd) barClass += ' past';
        else barClass += ' pending';

        return `
          <div class="${barClass}" style="left: ${leftPct}%; width: ${widthPct}%; top: ${idx * 28 + 24}px;" title="${t.title} (${s.start}-${s.end})">
            <span class="ts-gantt-title-text">${t.title}</span>
          </div>
        `;
      }).join('');

      ganttHTML = `
        <div class="ts-gantt-wrapper">
          <div class="ts-gantt-container" style="height: ${scheduledTasksForGantt.length * 28 + 36}px">
            ${gridLines}
            ${bars}
          </div>
        </div>
      `;
    }

    const cardsHTML = dayTasks.map(task => {
      const dp = task.daily_progress || {};
      const ds = task.daily_schedule || {};

      const done       = dp[this.selectedDate] === true;
      const daySched   = ds[this.selectedDate]; // { start, end } | null/undefined
      const hasTimeSched = daySched && daySched.start && daySched.end;
      const isSkipped  = !hasTimeSched; // no schedule = skip this day

      const progress   = this.getTaskProgress(task);
      const totalDays  = this.getDaysDiff(task.start_date, task.end_date) + 1;
      const dayIdx     = this.getDaysDiff(task.start_date, this.selectedDate) + 1;

      // ── Time-based lock (today only) ────────────────────────
      const timeStatus   = (isToday && hasTimeSched) ? this.getTaskTimeStatus(task, this.selectedDate) : 'none';
      const isTimeLocked = isToday && hasTimeSched && timeStatus === 'past';
      const isActive     = isToday && hasTimeSched && timeStatus === 'active';

      const isLocked = isPast || isTimeLocked;

      // Toggle state: locked or skipped → disabled
      const toggleDisabled = (isLocked || isSkipped) ? 'disabled' : '';
      const toggleClass = `ts-toggle ${done ? 'done' : ''} ${isLocked ? 'locked' : ''} ${isSkipped ? 'skip' : ''}`;
      const toggleIcon  = isSkipped ? '/' : isLocked ? (done ? '✓' : '—') : (done ? '✓' : '');
      const toggleTitle = isSkipped  ? 'Not scheduled today'
        : isPast          ? 'Past day — read only'
        : isTimeLocked    ? `Time ${daySched.start}–${daySched.end} has passed`
        : done            ? 'Mark Not Done'
        : 'Mark Done';

      // ── Time badge ─────────────────────────────────────────
      let timeBadge = '';
      if (isSkipped) {
        timeBadge = `<span class="ts-skip-badge">⊘ Not scheduled</span>`;
      } else if (isActive) {
        timeBadge = `<span class="ts-time-badge active">🟢 Now · ${daySched.start}–${daySched.end}</span>`;
      } else if (isTimeLocked) {
        timeBadge = `<span class="ts-time-badge past">🕒 ${daySched.start}–${daySched.end}</span>`;
      } else {
        timeBadge = `<span class="ts-time-badge upcoming">⏰ ${daySched.start}–${daySched.end}</span>`;
      }

      // ── Inline schedule editor ─────────────────────────────
      let schedBlock = '';
      if (!isPast) {
        if (!isLocked) {
          // Fully editable
          schedBlock = `
            <div class="ts-sched-editor">
              <span class="ts-sched-label">⏱ Schedule:</span>
              <input class="ts-sched-input" type="time" id="sched-s-${task.id}" value="${daySched?.start || ''}" placeholder="Start" />
              <span class="ts-sched-sep">→</span>
              <input class="ts-sched-input" type="time" id="sched-e-${task.id}" value="${daySched?.end || ''}" placeholder="End" />
              <button class="ts-sched-save-btn" data-id="${task.id}" title="Save">✓ Set</button>
              <button class="ts-sched-skip-btn" data-id="${task.id}" title="Mark as not needed today">⊘ Skip</button>
            </div>
          `;
        } else {
          // Time-locked today: show read-only
          schedBlock = `
            <div class="ts-sched-locked-row">
              🔒 ${hasTimeSched ? `${daySched.start} → ${daySched.end}` : 'Not scheduled'}
            </div>
          `;
        }
      } else if (hasTimeSched) {
        // Past day: show schedule read-only
        schedBlock = `<div class="ts-sched-past-row">${daySched.start} → ${daySched.end}</div>`;
      }

      return `
        <div class="ts-task-card ${done ? 'done' : 'pending'} ${isLocked ? 'past-locked' : ''} ${isActive ? 'ts-card-active' : ''} ${isSkipped && !isPast ? 'ts-card-skip' : ''}" data-id="${task.id}">
          <button class="${toggleClass}" data-id="${task.id}" title="${toggleTitle}" ${toggleDisabled}>
            ${toggleIcon}
          </button>
          <div class="ts-task-body">
            <div class="ts-task-title-row">
              <div class="ts-task-title">${task.title}</div>
              ${timeBadge}
            </div>
            ${task.description ? `<div class="ts-task-desc">${task.description}</div>` : ''}
            ${schedBlock}
            <div class="ts-task-meta-row">
              <span class="ts-task-day-badge">${isSkipped ? '⊘ Skip' : `Day ${dayIdx} of ${totalDays}`}</span>
              <span class="ts-task-range">${task.start_date} → ${task.end_date}</span>
            </div>
            <div class="ts-progress-row">
              <div class="ts-progress-track">
                <div class="ts-progress-fill ${task.status}" style="width:${progress.pct}%"></div>
              </div>
              <span class="ts-progress-label">${progress.done}/${progress.total} scheduled days (${progress.pct}%)</span>
            </div>
          </div>
          <button class="ts-card-edit ${isLocked ? 'locked' : ''}" data-id="${task.id}" title="${isLocked ? 'Cannot edit — locked' : 'Edit task'}" ${isLocked ? 'disabled' : ''}>✏️</button>
        </div>
      `;
    }).join('');

    container.innerHTML = ganttHTML + cardsHTML;

    // Only bind events for non-past days
    if (!isPast) {
      // Toggle
      container.querySelectorAll('.ts-toggle:not([disabled])').forEach(btn => {
        btn.addEventListener('click', () => this.toggleDay(btn.dataset.id, this.selectedDate));
      });
      // Edit task
      container.querySelectorAll('.ts-card-edit:not([disabled])').forEach(btn => {
        btn.addEventListener('click', () => {
          const t = this.tasks.find(x => x.id === btn.dataset.id);
          if (t) this.openTaskModal(t);
        });
      });
      // Save schedule
      container.querySelectorAll('.ts-sched-save-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.dataset.id;
          const start = document.getElementById(`sched-s-${id}`)?.value;
          const end   = document.getElementById(`sched-e-${id}`)?.value;
          if (start && end) {
            this.saveDaySchedule(id, this.selectedDate, { start, end });
          } else {
            // Shake to indicate missing fields
            btn.closest('.ts-sched-editor')?.classList.add('ts-sched-shake');
            setTimeout(() => btn.closest('.ts-sched-editor')?.classList.remove('ts-sched-shake'), 500);
          }
        });
      });
      // Skip day
      container.querySelectorAll('.ts-sched-skip-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          this.saveDaySchedule(btn.dataset.id, this.selectedDate, null);
        });
      });
    }
  }

  // Save per-day schedule ────────────────────────────────────────────
  async saveDaySchedule(taskId, dateStr, schedule) {
    const task = this.tasks.find(t => t.id === taskId);
    if (!task) return;

    const ds = { ...(task.daily_schedule || {}) };
    const dp = { ...(task.daily_progress || {}) };

    if (schedule && schedule.start && schedule.end) {
      ds[dateStr] = schedule;
    } else {
      // Skip this day: remove schedule and progress entry
      delete ds[dateStr];
      delete dp[dateStr];
    }

    // Recalculate overall status using scheduled days
    const scheduledDates = Object.entries(ds).filter(([, s]) => s?.start && s?.end).map(([d]) => d);
    const doneDates = scheduledDates.filter(d => dp[d] === true);
    const status = scheduledDates.length === 0 ? 'todo'
      : doneDates.length >= scheduledDates.length ? 'done'
      : doneDates.length > 0 ? 'in_progress'
      : 'todo';

    try {
      const resp = await fetch(`/api/tasks/${taskId}?hub=${this.hubId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...task, daily_schedule: ds, daily_progress: dp, status }),
      });
      if (resp.ok) {
        task.daily_schedule = ds;
        task.daily_progress = dp;
        task.status = status;
        this.render();
      }
    } catch (e) {
      console.error('Save schedule failed', e);
    }
  }

  // Toggle daily status ─────────────────────────────────────────────
  async toggleDay(taskId, dateStr) {
    // Guard: past dates are read-only
    if (dateStr < this.getTodayStr()) return;

    const task = this.tasks.find(t => t.id === taskId);
    if (!task) return;

    const dp = { ...(task.daily_progress || {}) };
    dp[dateStr] = !dp[dateStr];

    // Derive status from scheduled days
    const ds = task.daily_schedule || {};
    const scheduledDates = Object.entries(ds).filter(([, s]) => s?.start && s?.end).map(([d]) => d);
    let status;
    if (scheduledDates.length > 0) {
      const doneDates = scheduledDates.filter(d => dp[d] === true);
      status = doneDates.length >= scheduledDates.length ? 'done'
        : doneDates.length > 0 ? 'in_progress' : 'todo';
    } else {
      // Fallback
      const total = this.getDaysDiff(task.start_date, task.end_date) + 1;
      const done  = Object.values(dp).filter(Boolean).length;
      status = done === 0 ? 'todo' : done >= total ? 'done' : 'in_progress';
    }

    try {
      const resp = await fetch(`/api/tasks/${taskId}?hub=${this.hubId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...task, daily_progress: dp, status }),
      });
      if (resp.ok) {
        task.daily_progress = dp;
        task.status = status;
        this.render();
      }
    } catch (e) {
      console.error('Toggle failed', e);
    }
  }

  // Task Overview ───────────────────────────────────────────────────
  renderTaskOverview() {
    const el = document.getElementById('ts-task-overview');
    if (!el) return;

    const FILTERS = [
      { key: 'all',         label: 'All' },
      { key: 'todo',        label: 'Todo' },
      { key: 'in_progress', label: 'In Progress' },
      { key: 'done',        label: 'Done' },
    ];

    el.innerHTML = `
      <div class="ts-overview-heading">
        <span>All Tasks</span>
        <span class="ts-overview-count" id="ts-overview-count">0</span>
      </div>
      <div class="ts-filter-chips" id="ts-filter-chips">
        ${FILTERS.map(f => `
          <button class="ts-filter-chip ${this.overviewFilter === f.key ? 'active' : ''}" data-filter="${f.key}">
            ${f.label}
          </button>
        `).join('')}
      </div>
      <div id="ts-overview-list"></div>
    `;

    // Bind filter chips
    el.querySelectorAll('.ts-filter-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        this.overviewFilter = chip.dataset.filter;
        // Update active chip style without full re-render
        el.querySelectorAll('.ts-filter-chip').forEach(c =>
          c.classList.toggle('active', c.dataset.filter === this.overviewFilter)
        );
        this.renderOverviewList();
      });
    });

    this.renderOverviewList();
  }

  renderOverviewList() {
    const listEl = document.getElementById('ts-overview-list');
    const countEl = document.getElementById('ts-overview-count');
    if (!listEl) return;

    // Sort by start_date ascending (earliest first)
    const sorted = [...this.tasks].sort((a, b) =>
      (a.start_date || '').localeCompare(b.start_date || '')
    );

    // Apply filter
    const filtered = this.overviewFilter === 'all'
      ? sorted
      : sorted.filter(t => t.status === this.overviewFilter);

    if (countEl) countEl.textContent = filtered.length;

    if (filtered.length === 0) {
      listEl.innerHTML = `<div class="ts-overview-empty">No ${this.overviewFilter === 'all' ? '' : this.overviewFilter.replace('_', ' ')} tasks.</div>`;
      return;
    }

    listEl.innerHTML = filtered.map(t => {
      const p = this.getTaskProgress(t);
      const statusIcon = t.status === 'done' ? '✓' : t.status === 'in_progress' ? '◑' : '○';
      return `
        <div class="ts-overview-row" data-id="${t.id}">
          <span class="ts-overview-status-icon ${t.status}">${statusIcon}</span>
          <div class="ts-overview-info">
            <div class="ts-overview-name">${t.title}</div>
            <div class="ts-overview-date-label">${t.start_date} → ${t.end_date}</div>
            <div class="ts-overview-bar-wrap">
              <div class="ts-overview-bar">
                <div class="ts-overview-bar-fill ${t.status}" style="width:${p.pct}%"></div>
              </div>
              <span class="ts-overview-pct">${p.pct}%</span>
            </div>
          </div>
          <button class="ts-overview-edit-btn" data-id="${t.id}">✏️</button>
        </div>
      `;
    }).join('');

    listEl.querySelectorAll('.ts-overview-edit-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const t = this.tasks.find(x => x.id === btn.dataset.id);
        if (t) this.openTaskModal(t);
      });
    });

    el.querySelectorAll('.ts-overview-row').forEach(row => {
      row.addEventListener('click', e => {
        if (e.target.closest('.ts-overview-edit-btn')) return;
        // Jump to task start date
        const t = this.tasks.find(x => x.id === row.dataset.id);
        if (t) {
          this.selectedDate = t.start_date;
          const start = new Date(t.start_date + 'T00:00:00');
          this.currentMonth = new Date(start.getFullYear(), start.getMonth(), 1);
          this.render();
        }
      });
    });
  }

  // Modal ───────────────────────────────────────────────────────────
  openTaskModal(task = null) {
    const modal = document.getElementById('modal-task');
    document.getElementById('modal-task-title').textContent = task ? 'Edit Task' : 'Add Task';
    document.getElementById('task-id-input').value = task?.id || '';
    document.getElementById('task-title-input').value = task?.title || '';
    document.getElementById('task-desc-input').value = task?.description || '';
    document.getElementById('task-start-input').value = task?.start_date || this.selectedDate;
    document.getElementById('task-end-input').value = task?.end_date || this.selectedDate;
    document.getElementById('task-status-input').value = task?.status || 'todo';
    document.getElementById('task-delete-btn').style.display = task ? 'block' : 'none';

    const saveBtn = document.getElementById('modal-task-save');
    const newSave = saveBtn.cloneNode(true);
    saveBtn.parentNode.replaceChild(newSave, saveBtn);
    newSave.addEventListener('click', () => this.saveTask());

    const delBtn = document.getElementById('task-delete-btn');
    const newDel = delBtn.cloneNode(true);
    delBtn.parentNode.replaceChild(newDel, delBtn);
    newDel.addEventListener('click', () => this.deleteTask());
    newDel.style.display = task ? 'block' : 'none';

    modal.querySelectorAll('.modal-close, #modal-task-cancel').forEach(btn => {
      const clone = btn.cloneNode(true);
      btn.parentNode.replaceChild(clone, btn);
      clone.addEventListener('click', () => this.closeTaskModal());
    });

    modal.classList.add('open');
  }

  closeTaskModal() {
    document.getElementById('modal-task').classList.remove('open');
  }

  async saveTask() {
    const id = document.getElementById('task-id-input').value;
    const title = document.getElementById('task-title-input').value.trim();
    if (!title) {
      document.getElementById('task-title-input').focus();
      return;
    }

    const payload = {
      title,
      description: document.getElementById('task-desc-input').value.trim(),
      start_date: document.getElementById('task-start-input').value,
      end_date: document.getElementById('task-end-input').value,
      status: document.getElementById('task-status-input').value,
    };

    if (id) {
      payload.id = id;
      // Preserve existing progress and daily_schedule on edit
      const existing = this.tasks.find(t => t.id === id);
      if (existing?.daily_progress) payload.daily_progress = existing.daily_progress;
      if (existing?.daily_schedule) payload.daily_schedule = existing.daily_schedule;
    }

    const method = id ? 'PUT' : 'POST';
    const url = id ? `/api/tasks/${id}?hub=${this.hubId}` : `/api/tasks?hub=${this.hubId}`;

    try {
      const resp = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (resp.ok) {
        this.closeTaskModal();
        await this.loadTasks();
        this.render();
      } else {
        console.error('Save failed:', resp.status, await resp.json().catch(() => ({})));
      }
    } catch (e) {
      console.error('Save task error', e);
    }
  }

  async deleteTask() {
    const id = document.getElementById('task-id-input').value;
    if (!id || !confirm('Delete this task? This will remove all daily progress.')) return;

    try {
      const resp = await fetch(`/api/tasks/${id}?hub=${this.hubId}`, { method: 'DELETE' });
      if (resp.ok) {
        this.closeTaskModal();
        await this.loadTasks();
        this.render();
      }
    } catch (e) {
      console.error('Delete task error', e);
    }
  }
}
