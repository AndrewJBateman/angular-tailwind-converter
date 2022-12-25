export interface ApiResponse {
    motd: {
        msg: string;
        url: string;
    };
    success: boolean;
    base: string;
    date: string;
    rates: {
        [key: string]: number;
    };
}

export interface Rates {
    [key: string]: number;
} 