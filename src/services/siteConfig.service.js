import ApiService from "./Api_services";

class SiteConfigService {
    static async getSiteConfig() {
        try {
            const response = await ApiService.fetchData({
                url: "api/payment-qr",
                method: "GET",
            });

            const data = response.data.data[0] || {};

            return {
                title: data.title || "Saraswati Financial Services Private Limited",
                siteUrl: data.siteUrl || "https://www.saraswatifinance.live",
                email: data.email || "Info@Saraswatifinance.live",
                phone: data.phoneNumbers || ["9773945780"],
                address: data.addresses || [
                    "Head Office- Plot no -258, K.V Nagar, Unit-3, Kharavela Nagar, Distt- Khorda (Orissa) 751001",
                    "Corporate Office- Tower A- 317 , 3rd floor, Bestech Business Tower, Sector-66, SAS Nagar, Chandigarh(Punjab) 160066",
                ],
                fileCharge: data.fileCharge || "4550",
                icardIsPdf: data.icardIsPdf !== undefined ? data.icardIsPdf : true,
                bankName: data.bankName || "",
                accountNo: data.accountNo || "",
                ifsc: data.ifsc || "",
                holderName: data.holderName || "",
            };
        } catch (error) {
            console.error("Error fetching site config:", error);
            // Return default values if API fails
            return {
                title: "Saraswati Financial Services Private Limited",
                siteUrl: "https://www.saraswatifinance.live",
                email: "Info@Saraswatifinance.live",
                phone: ["9773945780"],
                address: [
                    "Head Office- Plot no -258, K.V Nagar, Unit-3, Kharavela Nagar, Distt- Khorda (Orissa) 751001",
                    "Corporate Office- Tower A- 317 , 3rd floor, Bestech Business Tower, Sector-66, SAS Nagar, Chandigarh(Punjab) 160066",
                ],
                fileCharge: "4550",
                icardIsPdf: true,
                bankName: "",
                accountNo: "",
                ifsc: "",
                holderName: "",
            };
        }
    }
}

export default SiteConfigService;