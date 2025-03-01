// scheduler.js
import { format } from 'util';
import chalk from 'chalk';
import pino from 'pino';
import { getRandom } from './lib/myfunc';

const logger = pino().child({ level: 'silent' });

class Scheduler {
    constructor(conn) {
        this.conn = conn;
        this.intervals = new Map();
        this.timeouts = new Map();
    }

    init() {
        this._scheduleSholat();
        this._scheduleGroupManagement();
        this._scheduleAutoDelete();
        this._scheduleTaskReminder();
        this._scheduleSystemChecks();
    }

    _scheduleSholat() {
        // Jadwal sholat
        this.intervals.set('sholat-jumat', setInterval(() => {
            this.checkSholatJumat();
        }, 60000)); // Cek setiap 1 menit

        this.intervals.set('sholat-reminder', setInterval(async () => {
            await this.autoSholat();
        }, 60000));
    }

    _scheduleGroupManagement() {
        // Manajemen grup
        this.intervals.set('group-management', setInterval(() => {
            this.autoOpenCloseGc();
            this.notifGcAlarm();
        }, 60000));

        this.intervals.set('group-store', setInterval(() => {
            this.notifGcStore();
        }, 1800000)); // 30 menit
    }

    _scheduleAutoDelete() {
        // Auto delete chat
        this.intervals.set('auto-delete', setInterval(async () => {
            await this.autoDeleteChat();
        }, 300000)); // 5 menit
    }

    _scheduleTaskReminder() {
        // Pengingat tugas
        this.intervals.set('task-reminder', setInterval(() => {
            this.autoSendTugas();
            this.notifPrivate();
        }, 60000));
    }

    _scheduleSystemChecks() {
        // System health check
        this.intervals.set('system-check', setInterval(() => {
            this.checkConnectionStatus();
        }, 30000));
    }

    async autoDeleteChat() {
        try {
            const chats = await this.conn.chats.all();
            const now = Date.now();
            
            for (const chat of chats) {
                if (global.db.data.settings.whitelist?.includes(chat.id)) continue;
                
                if (now - chat.lastMessageTimestamp > 300000) {
                    await this.conn.chatModify({
                        delete: true,
                        lastMessages: [{
                            key: chat.lastMessageReciept,
                            messageTimestamp: chat.lastMessageTimestamp
                        }]
                    }, chat.id);
                    logger.info(chalk.green(`[AUTO DELETE] Chat ${chat.id} deleted`));
                }
            }
        } catch (error) {
            logger.error(chalk.red('[AUTO DELETE ERROR]'), format(error));
        }
    }

    async checkSholatJumat() {
        try {
            const now = new Date();
            if (now.getDay() === 5 && now.getHours() === 11) {
                await notifSholatJumat(this.conn);
            }
        } catch (error) {
            logger.error(chalk.red('[SHOLAT ERROR]'), format(error));
        }
    }

    async autoOpenCloseGc() {
        try {
            // Implementasi logika buka/tutup grup
            // ...
        } catch (error) {
            logger.error(chalk.red('[GROUP MANAGEMENT ERROR]'), format(error));
        }
    }

    async autoSholat() {
        try {
            // Implementasi logika sholat
            // ...
        } catch (error) {
            logger.error(chalk.red('[SHOLAT REMINDER ERROR]'), format(error));
        }
    }

    async autoSendTugas() {
        try {
            // Implementasi pengiriman tugas
            // ...
        } catch (error) {
            logger.error(chalk.red('[TASK REMINDER ERROR]'), format(error));
        }
    }

    checkConnectionStatus() {
        try {
            if (!this.conn.connection) {
                logger.warn(chalk.yellow('[CONNECTION WARNING] Connection lost!'));
                this.conn.reconnect();
            }
        } catch (error) {
            logger.error(chalk.red('[CONNECTION CHECK ERROR]'), format(error));
        }
    }

    stopAll() {
        for (const [name, interval] of this.intervals) {
            clearInterval(interval);
        }
        for (const [name, timeout] of this.timeouts) {
            clearTimeout(timeout);
        }
    }
}

export const scheduler = new Scheduler();

// Fungsi legacy untuk kompatibilitas
export async function notifSholatJumat(conn) {
    // Implementasi notifikasi sholat Jumat
}

export async function autoOpenCloseGc(conn) {
    scheduler.autoOpenCloseGc();
}

export async function autoSholat(conn) {
    scheduler.autoSholat();
}

export async function autoSendTugas(conn) {
    scheduler.autoSendTugas();
}

export async function notifGcStore(conn) {
    // Implementasi notifikasi grup store
}

export async function notifPrivate(conn) {
    // Implementasi notifikasi private
}

export async function notifGcAlarm(conn) {
    // Implementasi alarm grup
}
