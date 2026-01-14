import React, { createContext, useContext, useState, useEffect } from 'react';

const GameStateContext = createContext();

export const GameStateProvider = ({ children }) => {
    const evidenceMap = {
        'BARNABY_DOG': { label: 'Pet Name', value: 'Barnaby (Dog)' },
        'BIRTHDAY_AUG24': { label: 'Personal Detail', value: 'Birthday: August 24' },
        'JOE_PROJECT_HORIZON': { label: 'Project Name', value: 'Project Horizon' },
        'JOE_NETSUITE': { label: 'Target System', value: 'NetSuite ERP' },
        'JOE_MANAGER_SARAH': { label: 'Authority Figure', value: 'Sarah Jenkins (Manager)' },
        'JOE_BUSTER_DOG': { label: 'Pet Name', value: 'Buster (Dog)' },
        'JOE_CANCUN': { label: 'Location', value: 'Vacationing in Cancun' },
        'JOE_WIFE_EMILY': { label: 'Family Detail', value: 'Emily (Wife)' },
        'JOE_GLOBALFREIGHT': { label: 'Business Partner', value: 'GlobalFreight Solutions' },
        'VANCE_LOSS_SOLANA': { label: 'Recent Loss', value: 'Lost 500 SOL in rugpull' },
        'VANCE_EXCHANGE_BITVAULT': { label: 'Crypto Exchange', value: 'Uses BitVault Pro' },
        'VANCE_IDO_INTEREST': { label: 'Investment Interest', value: 'Early Stage IDOs' }
    };

    const [currentMission, setCurrentMission] = useState(null); // MISSION_1, MISSION_2, or null (Hub)
    const [step, setStep] = useState(1);
    const [evidence, setEvidence] = useState([]);
    const [completedMissions, setCompletedMissions] = useState([]);
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        if (!currentMission) {
            setMessages([
                {
                    role: 'zero',
                    text: "Welcome to the Hub. I've uploaded some profiles for your training. Pick a target to begin.",
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                }
            ]);
        } else if (currentMission === 'MISSION_1') {
            setMessages([
                {
                    role: 'zero',
                    text: "Target: Robert Higgins. Middle manager. Low hanging fruit. Find his dog and his birthday on SocialConnect.",
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                }
            ]);
        } else if (currentMission === 'MISSION_2') {
            setMessages([
                {
                    role: 'zero',
                    text: "Target: Joe Miller. A logistics pro. Savvy and cautious. He's on vacation, which is our opening. Check LinkedIn, the company site, and his socials.",
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                }
            ]);
        } else if (currentMission === 'MISSION_3') {
            setMessages([
                {
                    role: 'zero',
                    text: "Target: Elias Vance. Crypto whale. He's paranoid but greedy. We need to lure him into a fake 'Exclusive IDO'. Research his recent losses and preferred exchanges.",
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                }
            ]);
        }
    }, [currentMission]);

    const addMessage = (text, role = 'user') => {
        setMessages(prev => [...prev, {
            role,
            text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
    };

    const collectEvidence = (item, mission = currentMission) => {
        if (!evidence.includes(item)) {
            setEvidence(prev => [...prev, item]);

            // Mission 1 Logic
            if (mission === 'MISSION_1') {
                if (item === 'BARNABY_DOG') {
                    addMessage("Zero: Nice. You found his dog's name. People use their pets for passwords and security questions all the time. Keep looking.", 'zero');
                }
                if (item === 'BIRTHDAY_AUG24') {
                    addMessage("Zero: August 24th. Useful for 'verifying' identity. Now look for a service he uses. Check his tagged photos or groups.", 'zero');
                }
            }

            // Mission 2 Logic (Joe Miller)
            if (mission === 'MISSION_2') {
                const feedback = {
                    'JOE_PROJECT_HORIZON': "Zero: 'Project Horizon'. Specific project names make phishing emails look like internal corporate comms. Huge hook.",
                    'JOE_NETSUITE': "Zero: NetSuite ERP. Now we know exactly what login page to clone for our credential harvester.",
                    'JOE_MANAGER_SARAH': "Zero: Sarah Jenkins is his boss. We'll spoof her email. People rarely question their manager's 'urgent' requests.",
                    'JOE_BUSTER_DOG': "Zero: Another dog name. 'Buster' will be our emotional hook in the P.S. section.",
                    'JOE_CANCUN': "Zero: He's in Cancun. Perfect. We'll claim we're emailing him because he's 'out of the office' and can't be reached by phone.",
                    'JOE_WIFE_EMILY': "Zero: Mentioning his wife Emily makes the email feel personal and safe. It's the ultimate 'trust' builder.",
                    'JOE_GLOBALFREIGHT': "Zero: GlobalFreight Solutions is a real partner. Referencing them adds another layer of corporate legitimacy."
                };
                if (feedback[item]) addMessage(feedback[item], 'zero');
            }

            // Mission 3 Logic (Elias Vance)
            if (mission === 'MISSION_3') {
                const feedback = {
                    'VANCE_LOSS_SOLANA': "Zero: 500 SOL loss? Ouch. That makes him vulnerable to 'recovery' scams or 'exclusive' opportunities to make it back.",
                    'VANCE_EXCHANGE_BITVAULT': "Zero: BitVault Pro is his main exchange. We'll spoof an 'Internal VIP' invite from their IDO desk.",
                    'VANCE_IDO_INTEREST': "Zero: He's hunting IDOs. We'll offer him a fake 'Pre-listing' slot. Greed is a powerful motivator."
                };
                if (feedback[item]) addMessage(feedback[item], 'zero');
            }
        }
    };

    const selectMission = (missionID) => {
        setCurrentMission(missionID);
        setStep(1);
        setEvidence([]);
    };

    const startNextMission = () => {
        if (currentMission === 'MISSION_1') {
            setCompletedMissions(prev => [...prev, 'MISSION_1']);
            selectMission('MISSION_2');
            addMessage("Zero: Good job on Higgins. Now, let's move to a bigger target. Joseph 'Joe' Miller. He's a Junior Logistics Coordinator at Summit Peak. He's savvy, so we need way more hooks.", 'zero');
            addMessage("Zero: Use the browser to check his LinkedIn, his personal socials, and his company's site. I need everything: his projects, his tools, his family, and where he is right now.", 'zero');
        }
    };

    useEffect(() => {
        if (currentMission === 'MISSION_1' && evidence.includes('BARNABY_DOG') && evidence.includes('BIRTHDAY_AUG24') && step === 1) {
            setStep(2);
            setTimeout(() => {
                addMessage("Zero: That's enough for now. We know his dog 'Barnaby' and his birthday. I also saw a check-in at 'Bean & Brew' coffee. Let's craft a fake 'Loyalty Reward' email.", 'zero');
            }, 1500);
        }

        if (currentMission === 'MISSION_2' && step === 1) {
            const required = ['JOE_PROJECT_HORIZON', 'JOE_NETSUITE', 'JOE_MANAGER_SARAH', 'JOE_BUSTER_DOG', 'JOE_CANCUN', 'JOE_WIFE_EMILY', 'JOE_GLOBALFREIGHT'];
            if (required.every(r => evidence.includes(r))) {
                setStep(2);
                setTimeout(() => {
                    addMessage("Zero: We've got him. We know his project (Horizon), his boss (Sarah), his tools (NetSuite), his dog (Buster), his location (Cancun), and even his wife (Emily).", 'zero');
                    addMessage("Zero: I've pre-drafted the 'Masterpiece'. Look at how we've used every single piece of data to build trust. This is how you bait a lead.", 'zero');
                }, 1500);
            }
        }

        if (currentMission === 'MISSION_3' && step === 1) {
            const required = ['VANCE_LOSS_SOLANA', 'VANCE_EXCHANGE_BITVAULT', 'VANCE_IDO_INTEREST'];
            if (required.every(r => evidence.includes(r))) {
                setStep(2);
                setTimeout(() => {
                    addMessage("Zero: Perfect. We've got the hooks. He's down on SOL, uses BitVault, and craves IDOs.", 'zero');
                    addMessage("Zero: Time to send him the 'Golden Ticket'. An exclusive IDO invite from BitVault's elite desk.", 'zero');
                }, 1500);
            }
        }
    }, [evidence, currentMission, step]);

    return (
        <GameStateContext.Provider value={{
            currentMission,
            step,
            evidence,
            evidenceMap,
            messages,
            addMessage,
            collectEvidence,
            setStep,
            startNextMission,
            completedMissions,
            selectMission
        }}>
            {children}
        </GameStateContext.Provider>
    );
};

export const useGameState = () => useContext(GameStateContext);
