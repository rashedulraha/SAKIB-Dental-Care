/**
 * Configuration and utilities for the Hidden Admin Access System.
 * Supports both Desktop (ESC shortcut) and Mobile (Multi-tap gesture) triggers.
 */

export interface HiddenAdminConfig {
  /**
   * Number of consecutive taps required to trigger the secret admin access modal.
   * @default 5
   */
  tapCount: number;

  /**
   * Maximum interval in milliseconds allowed between consecutive taps.
   * If exceeded, the tap sequence resets.
   * @default 800
   */
  maxIntervalMs: number;

  /**
   * Overall sequence timeout in milliseconds.
   * If the full sequence is not completed within this time, the sequence resets.
   * @default 2500
   */
  timeoutMs: number;

  /**
   * Whether to trigger subtle haptic vibration on supported mobile devices upon activation.
   * @default true
   */
  enableHaptics: boolean;
}

export const DEFAULT_ADMIN_ACCESS_CONFIG: HiddenAdminConfig = {
  tapCount: 5,
  maxIntervalMs: 800,
  timeoutMs: 2500,
  enableHaptics: true,
};

/**
 * Custom event name used to trigger opening the shared admin access modal
 * from any component or gesture detector across the application.
 */
export const ADMIN_ACCESS_EVENT = "sdc:open-admin-access";

export interface AdminAccessEventDetail {
  source?: "gesture" | "keyboard" | "manual";
}

/**
 * Dispatches a custom event to open the hidden admin access modal.
 */
export function triggerAdminAccess(detail: AdminAccessEventDetail = { source: "manual" }): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent<AdminAccessEventDetail>(ADMIN_ACCESS_EVENT, { detail })
    );
  }
}

