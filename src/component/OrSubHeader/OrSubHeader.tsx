import React, { ChangeEvent, ReactNode }  from "react";
import './OrSubHeader.scss';
import OrButton from "../OrButton/OrButton";


interface OrSubHeaderProps {
    toggleFilter: () => void; 
    isFilterVisible: boolean; 
}

const OrSubHeader: React.FC<OrSubHeaderProps> = ({
    toggleFilter, 
    isFilterVisible 

}) => { 

    return (
        <div className="sub-header">
            <OrButton
            size="lg"
            variant="primary"
            appearance="outline"
            text={isFilterVisible ? "Hide Filter" : "Show Filter"}
            onClick={toggleFilter}
            />
        </div>

    );
};

export default OrSubHeader;