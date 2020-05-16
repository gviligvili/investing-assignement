export interface SettingsInterface {
    BASE_URL: string;
}

/**
 * hard coded server url but would inject it as env variable..
 */
const holder: SettingsInterface = {
    // @ts-ignore
    BASE_URL: 'http://localhost:3005',
};

class Settings {
    static get(): SettingsInterface {
        return {
            ...holder
        };
    }
}

export default Settings;
