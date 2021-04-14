import { v4 as uuidv4 } from 'uuid';
import mock from 'src/utils/mock';

const db = {
    stocks: [
        {
            "isin": "INE002A01018",
            "companyName": "Reliance Industries",
            "companyLogo": "https://assets-netstorage.groww.in/stock-assets/logos/INE002A01018.png",
            "companyDescription": "Reliance Industries Ltd. is in Refineries. It was incorporated in year 1973. The current market capitalisation stands ₹13,06,364 Cr. The company is listed on the Bombay Stock Exchange (BSE) with the BSE code as 500325. and also listed on National Stock Exchange (NSE) with NSE code as RELIANCE.",
            "bseScriptCode": 500325,
            "nseScriptCode": "RELIANCE",
            "yearlyHighPrice": 2368.8,
            "yearlyLowPrice": 1132.41,
            "marketCap": 1211657534169600,
            "pb": 2.1184,
            "pe": 9.8408,
            "industryPe": 75.65,
            "divYield": 0.33,
            "bookValue": 630.80,
            "roe": 6.45,
            "eps": 40.68,
            "livePriceDto": {
                "type": "LIVE_PRICE",
                "symbol": "RELIANCE",
                "tsInMillis": 1618309776,
                "open": 1924.0,
                "high": 1940.6,
                "low": 1917.85,
                "close": 1911.15,
                "ltp": 1931.8,
                "dayChange": 20.649999999999864,
                "dayChangePerc": 1.0805012688695217,
                "lowPriceRange": 1738.65,
                "highPriceRange": 2124.95,
                "volume": 8958261,
                "totalBuyQty": 46.0,
                "totalSellQty": 0.0
            }
        }
    ],
    mutualfunds: [
        {
            "id": "axis-equity-fund-direct-growth",
            "fund_name": "Axis Bluechip Fund",
            "category": "Equity",
            "sub_category": "Large Cap",
            "min_sip_investment": 500.0,
            "sip_allowed": true,
            "lumpsum_allowed": true,
            "return3y": 15.38,
            "return1y": 42.22,
            "return5y": 17.28,
            "return1d": -3.31,
            "risk_rating": 6,
            "scheme_name": "Axis Bluechip Fund Direct Plan Growth",
            "scheme_type": "Growth",
            "fund_manager": "Shreyash Devalkar",
            "fund_house": "Axis Mutual Fund",
            "scheme_code": "120465",
            "risk": "Very High",
            "doc_required": false,
            "plan_type": "Direct",
            "logo_url": "https://assets-netstorage.groww.in/mf-assets/logos/axis_groww.png"
        }
    ]
    ,
    fixed_deposits: [
        {
            "id": "equitas-bank-fd-one-year",
            "bankName": "Equitas Small Finance Bank",
            "bankCode": "EQUITAS-BANK",
            "productName": "Equitas 1 year",
            "bankProdCode": "EQUITAS-007",
            "bankLogoUrl": "https://storage.googleapis.com/groww-assets/banking-assets/equitas-bank.svg",
            "tenure": "365 Days",
            "minAmount": 5000.0,
            "dayStart": 365,
            "dayEnd": 365,
            "maxAmount": 90000.0,
            "interestRate": 6.5,
            "compoundingType": "QUARTERLY",
        }
    ],
    gold: [
        {
            rateAmount: 463043,
            rateId: "k9P2GpVq",
            rateType: "AUGMONT_GOLD",
            return_percent: 48.54,
            logo_url: "https://assets-netstorage.groww.in/website-assets/prod/1.5.3/build/client/images/logo-augmont.cb7c8652.png",
        }
    ],

    usstocks: [
        {
            isin: uuidv4(),
            sector: "Consumer Cyclical",
            name: 'Apple industries',
            change: -0.04,
            changePercent: -0.15,
            lastPrice: 1994.65,
            yesterdayClose: 1991.45,
            marketCap: 1263292288608000,
            "pb": 2.1184,
            "pe": 9.8408,
            "enterprisValue": 75.65,
            "divYield": 0.33,
            "bookValue": 630.80,
            "roe": 6.45,
            "eps": 40.68,
        }
    ]
};

mock.onGet('/api/stocks/all').reply(200, {
    stocks: [
        {
            isin: uuidv4(),
            companyName: 'Reliance Industries',
            ltp: 1994.65,
            closePrice: 1991.45,
            marketCap: 1263292288608000
        },
        {
            isin: uuidv4(),
            companyName: 'Adani Industries',
            ltp: 1994.65,
            closePrice: 1991.45,
            marketCap: 1263292288608000
        },
        {
            isin: uuidv4(),
            companyName: 'Dhobi Industries',
            ltp: 1994.65,
            closePrice: 1991.45,
            marketCap: 1263292288608000
        }
        , {
            isin: uuidv4(),
            companyName: 'Reliance Industries',
            ltp: 1994.65,
            closePrice: 1991.45,
            marketCap: 1263292288608000
        }
        , {
            isin: uuidv4(),
            companyName: 'Reliance Industries',
            ltp: 1994.65,
            closePrice: 1991.45,
            marketCap: 1263292288608000
        }
        , {
            isin: uuidv4(),
            companyName: 'Reliance Industries',
            ltp: 1994.65,
            closePrice: 1991.45,
            marketCap: 1263292288608000
        }
        , {
            isin: uuidv4(),
            companyName: 'Reliance Industries',
            ltp: 1994.65,
            closePrice: 1991.45,
            marketCap: 1263292288608000
        }
        , {
            isin: uuidv4(),
            companyName: 'Reliance Industries',
            ltp: 1994.65,
            closePrice: 1991.45,
            marketCap: 1263292288608000
        }
        , {
            isin: uuidv4(),
            companyName: 'Reliance Industries',
            ltp: 1994.65,
            closePrice: 1991.45,
            marketCap: 1263292288608000
        }
        , {
            isin: uuidv4(),
            companyName: 'Reliance Industries',
            ltp: 1994.65,
            closePrice: 1991.45,
            marketCap: 1263292288608000
        }
        , {
            isin: uuidv4(),
            companyName: 'Reliance Industries',
            ltp: 1994.65,
            closePrice: 1991.45,
            marketCap: 1263292288608000
        }
    ]
}
);


mock.onGet('/api/fixed-deposits/all').reply(200, {
    fixedDeposits: [
            {
            id: uuidv4(),
            bankName : "Equitas Small Finance Bank",
            tenure: "3 Months",
            interestRate: 4.9,
            logo_url: "https://storage.googleapis.com/groww-assets/banking-assets/equitas-bank.svg",
           
        },
        {
            id: uuidv4(),
            bankName : "Equitas Small Finance Bank",
            tenure: "6 Months",
            interestRate: 5.4,
            logo_url: "https://storage.googleapis.com/groww-assets/banking-assets/equitas-bank.svg",
           
        },
        {
            id: uuidv4(),
            bankName : "Equitas Small Finance Bank",
            tenure: "9 Months",
            interestRate: 5.4,
            logo_url: "https://storage.googleapis.com/groww-assets/banking-assets/equitas-bank.svg",
           
        },
        {
            id: uuidv4(),
            bankName : "Equitas Small Finance Bank",
            tenure: "9 Months",
            interestRate: 6.50,
            logo_url: "https://storage.googleapis.com/groww-assets/banking-assets/equitas-bank.svg",
           
        },
        {
            id: uuidv4(),
            bankName : "Bajaj Finance Limited",
            tenure: "3 Months",
            interestRate: 4.9,
            logo_url: "https://storage.googleapis.com/groww-assets/banking-assets/bajaj-finance-bank.svg",
           
        },
        {
            id: uuidv4(),
            bankName : "Bajaj Finance Limited",
            tenure: "6 Months",
            interestRate: 5.4,
            logo_url: "https://storage.googleapis.com/groww-assets/banking-assets/bajaj-finance-bank.svg",
           
        },
        {
            id: uuidv4(),
            bankName : "Bajaj Finance Limited",
            tenure: "9 Months",
            interestRate: 5.4,
            logo_url: "https://storage.googleapis.com/groww-assets/banking-assets/bajaj-finance-bank.svg",
           
        },
        {
            id: uuidv4(),
            bankName : "Bajaj Finance Limited",
            tenure: "9 Months",
            interestRate: 6.50,
            logo_url: "https://storage.googleapis.com/groww-assets/banking-assets/bajaj-finance-bank.svg",
           
        },
    ]
}
);



mock.onGet('/api/mutual-funds/all').reply(200, {
    mf_schemes: [
        {
            id: uuidv4(),
            risk: "Very High",
            risk_rating: 6,
            return1d: 0.63,
            return1y: 108.83,
            return3y: 29.82,
            return5y: 21.64,
            logo_url: "https://assets-netstorage.groww.in/mf-assets/logos/tata_groww.png",
            scheme_name: "Tata Digital India Fund Direct Growth",
            category: "Equity"
        },
        {
            id: uuidv4(),
            risk: "Very High",
            risk_rating: 6,
            return1d: 0.63,
            return1y: 108.83,
            return3y: 29.82,
            return5y: 21.64,
            logo_url: "https://assets-netstorage.groww.in/mf-assets/logos/icici_groww.png",
            scheme_name: "ICICI Prudential Technology Direct Plan Growth",
            category: "Equity"
        },
        {
            id: uuidv4(),
            risk: "Very High",
            risk_rating: 6,
            return1d: 0.63,
            return1y: 108.83,
            return3y: 29.82,
            return5y: 21.64,
            logo_url: "https://assets-netstorage.groww.in/mf-assets/logos/tata_groww.png",
            scheme_name: "Tata Digital India Fund Direct Growth",
            category: "Equity"
        },
        {
            id: uuidv4(),
            risk: "Very High",
            risk_rating: 6,
            return1d: 0.63,
            return1y: 108.83,
            return3y: 29.82,
            return5y: 21.64,
            logo_url: "https://assets-netstorage.groww.in/mf-assets/logos/tata_groww.png",
            scheme_name: "Tata Digital India Fund Direct Growth",
            category: "Equity"
        },
        {
            id: uuidv4(),
            risk: "Very High",
            risk_rating: 6,
            return1d: 0.63,
            return1y: 108.83,
            return3y: 29.82,
            return5y: 21.64,
            logo_url: "https://assets-netstorage.groww.in/mf-assets/logos/tata_groww.png",
            scheme_name: "Tata Digital India Fund Direct Growth",
            category: "Equity"
        },
        {
            id: uuidv4(),
            risk: "Very High",
            risk_rating: 6,
            return1d: 0.63,
            return1y: 108.83,
            return3y: 29.82,
            return5y: 21.64,
            logo_url: "https://assets-netstorage.groww.in/mf-assets/logos/tata_groww.png",
            scheme_name: "Tata Digital India Fund Direct Growth",
            category: "Equity"
        },
        {
            id: uuidv4(),
            risk: "Very High",
            risk_rating: 6,
            return1d: 0.63,
            return1y: 108.83,
            return3y: 29.82,
            return5y: 21.64,
            logo_url: "https://assets-netstorage.groww.in/mf-assets/logos/tata_groww.png",
            scheme_name: "Tata Digital India Fund Direct Growth",
            category: "Equity"
        },
        {
            id: uuidv4(),
            risk: "Very High",
            risk_rating: 6,
            return1d: 0.63,
            return1y: 108.83,
            return3y: 29.82,
            return5y: 21.64,
            logo_url: "https://assets-netstorage.groww.in/mf-assets/logos/tata_groww.png",
            scheme_name: "Tata Digital India Fund Direct Growth",
            category: "Equity"
        },
        {
            id: uuidv4(),
            risk: "Very High",
            risk_rating: 6,
            return1d: 0.63,
            return1y: 108.83,
            return3y: 29.82,
            return5y: 21.64,
            logo_url: "https://assets-netstorage.groww.in/mf-assets/logos/tata_groww.png",
            scheme_name: "Tata Digital India Fund Direct Growth",
            category: "Equity"
        },
        {
            id: uuidv4(),
            risk: "Very High",
            risk_rating: 6,
            return1d: 0.63,
            return1y: 108.83,
            return3y: 29.82,
            return5y: 21.64,
            logo_url: "https://assets-netstorage.groww.in/mf-assets/logos/tata_groww.png",
            scheme_name: "Tata Digital India Fund Direct Growth",
            category: "Equity"
        },
        {
            id: uuidv4(),
            risk: "Very High",
            risk_rating: 6,
            return1d: 0.63,
            return1y: 108.83,
            return3y: 29.82,
            return5y: 21.64,
            logo_url: "https://assets-netstorage.groww.in/mf-assets/logos/tata_groww.png",
            scheme_name: "Tata Digital India Fund Direct Growth",
            category: "Equity"
        },
        {
            id: uuidv4(),
            risk: "Very High",
            risk_rating: 6,
            return1d: 0.63,
            return1y: 108.83,
            return3y: 29.82,
            return5y: 21.64,
            logo_url: "https://assets-netstorage.groww.in/mf-assets/logos/tata_groww.png",
            scheme_name: "Tata Digital India Fund Direct Growth",
            category: "Equity"
        },
        
       
    ]
}
);


mock.onGet('/api/us-stocks/all').reply(200, {
    stocks: [
        {
            isin: uuidv4(),
            sector: "Consumer Cyclical",
            name: 'Reliance Industries',
            change: -0.04,
            changePercent: -0.15,
            lastPrice: 1994.65,
            yesterdayClose: 1991.45,
            marketCap: 1263292288608000
        },
        {
            isin: uuidv4(),
            sector: "Consumer Cyclical",
            name: 'Adani Industries',
            change: 0.04,
            changePercent: 0.15,
            lastPrice: 1994.65,
            yesterdayClose: 1991.45,
            marketCap: 1263292288608000
        },
        {
            isin: uuidv4(),
            sector: "Consumer Cyclical",
            name: 'Dhobi Industries',
            change: 0.04,
            changePercent: 0.15,
            lastPrice: 1994.65,
            yesterdayClose: 1991.45,
            marketCap: 1263292288608000
        }
        , {
            isin: uuidv4(),
            sector: "Consumer Cyclical",
            name: 'Reliance Industries',
            change: 0.04,
            changePercent: 0.15,
            lastPrice: 1994.65,
            yesterdayClose: 1991.45,
            marketCap: 1263292288608000
        }
        , {
            isin: uuidv4(),
            sector: "Consumer Cyclical",
            name: 'Reliance Industries',
            change: 0.04,
            changePercent: 0.15,
            lastPrice: 1994.65,
            yesterdayClose: 1991.45,
            marketCap: 1263292288608000
        }
        , {
            isin: uuidv4(),
            sector: "Consumer Cyclical",
            name: 'Reliance Industries',
            change: 0.04,
            changePercent: 0.15,
            lastPrice: 1994.65,
            yesterdayClose: 1991.45,
            marketCap: 1263292288608000
        }
        , {
            isin: uuidv4(),
            sector: "Consumer Cyclical",
            name: 'Reliance Industries',
            change: 0.04,
            changePercent: 0.15,
            lastPrice: 1994.65,
            yesterdayClose: 1991.45,
            marketCap: 1263292288608000
        }
        , {
            isin: uuidv4(),
            sector: "Consumer Cyclical",
            name: 'Reliance Industries',
            change: 0.04,
            changePercent: 0.15,
            lastPrice: 1994.65,
            yesterdayClose: 1991.45,
            marketCap: 1263292288608000
        }
        , {
            isin: uuidv4(),
            sector: "Consumer Cyclical",
            name: 'Reliance Industries',
            change: 0.04,
            changePercent: 0.15,
            lastPrice: 1994.65,
            yesterdayClose: 1991.45,
            marketCap: 1263292288608000
        }
        , {
            isin: uuidv4(),
            sector: "Consumer Cyclical",
            name: 'Reliance Industries',
            change: 0.04,
            changePercent: 0.15,
            lastPrice: 1994.65,
            yesterdayClose: 1991.45,
            marketCap: 1263292288608000
        }
        , {
            isin: uuidv4(),
            sector: "Consumer Cyclical",
            name: 'Reliance Industries',
            change: 0.04,
            changePercent: 0.15,
            lastPrice: 1994.65,
            yesterdayClose: 1991.45,
            marketCap: 1263292288608000
        }
    ]
}
);



