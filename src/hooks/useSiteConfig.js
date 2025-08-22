import { useState, useEffect } from "react";
import SiteConfigService from "../services/siteConfig.service";

const useSiteConfig = () => {
    const [config, setConfig] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchConfig = async() => {
            try {
                setLoading(true);
                const data = await SiteConfigService.getSiteConfig();
                setConfig(data);
                setError(null);
            } catch (err) {
                setError(err);
                console.error("Error fetching site config:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchConfig();
    }, []);

    const refreshConfig = async() => {
        try {
            setLoading(true);
            const data = await SiteConfigService.getSiteConfig();
            setConfig(data);
            setError(null);
        } catch (err) {
            setError(err);
            console.error("Error refreshing site config:", err);
        } finally {
            setLoading(false);
        }
    };

    return {
        config,
        loading,
        error,
        refreshConfig,
    };
};

export default useSiteConfig;