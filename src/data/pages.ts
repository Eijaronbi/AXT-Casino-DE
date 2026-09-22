export type InfoSection = { title: string; body: string };

export const pageTitles: Record<string, string> = {
  'about-us': 'About us', support: 'Support', faq: 'Frequently asked questions',
  'responsible-gambling': 'Responsible gambling', 'terms-and-conditions': 'Terms and conditions',
  'privacy-policy': 'Privacy policy', 'cookie-policy': 'Cookie policy', complaints: 'Complaints',
  'aml-policy': 'AML policy', 'bonus-terms-and-conditions': 'Bonus terms and conditions',
};

export const infoPages: Record<string, InfoSection[]> = {
  'about-us': [
    { title: 'The Best Games', body: 'Discover a broad selection of slots, table games, live casino titles, jackpots, and instant-win experiences from leading studios.' },
    { title: 'Quick Withdrawals', body: 'A clear cashier experience makes deposits and withdrawal requests easy to understand.' },
    { title: 'Generous Rewards', body: 'Welcome offers, daily rewards, missions, tournaments, and VIP benefits add more ways to enjoy the catalog.' },
    { title: 'Multicurrency', body: 'The interface supports popular currencies and payment methods for players in supported regions.' },
    { title: 'Support 24/7', body: 'The support experience is available around the clock through the help form and live-support interface.' },
    { title: 'License and Security', body: 'AxeBonanza Casino is presented as a secure, responsible entertainment experience. This educational build does not process real accounts or payments.' },
  ],
  faq: [
    { title: 'Account', body: 'Use Sign Up to open the registration demo. Login, password recovery, and account creation remain local demonstrations in this frontend build.' },
    { title: 'Deposit Methods', body: 'The Payments page lists the supported-method presentation. No deposit or withdrawal can be made in this educational version.' },
    { title: 'Games', body: 'Browse games by category or provider, search the sample catalog, and open game detail previews from the grid.' },
    { title: 'Security', body: 'Forms do not transmit personal information. The only locally saved value is the cookie-notice preference.' },
  ],
  'responsible-gambling': [
    { title: '1. General', body: 'Gaming should remain a form of entertainment. Set clear limits for time and spending, and never chase losses.' },
    { title: '2. Assistance for problem gaming', body: 'If play stops being enjoyable, pause and seek confidential help from a recognised responsible-gambling support organisation.' },
    { title: '3. Personal limits', body: 'Use deposit, loss, wager, and session limits where available, and consider time-outs or self-exclusion when needed.' },
    { title: '4. External help', body: 'Independent organisations such as Gambling Therapy and Gordon Moody provide practical, confidential support.' },
    { title: '5. Protection of minors', body: 'Casino services are intended only for adults who meet the legal gambling age in their jurisdiction.' },
  ],
  'terms-and-conditions': ['General information','Eligibility and restrictions','Game availability and restrictions','Payments and currencies','Taxes and fees','Game rules','Disclaimer of liabilities','Use of player account','Anti-fraud policy','Depositing','Withdrawal policy','Dormant accounts','Expiry period','Refund policy','Complaints','Non-transferability','Arbitration','KYC and account verification'].map((title,index)=>({title:`${index+1}. ${title}`,body:'This educational recreation does not provide real-money gaming, create accounts, or accept payments. Any production service must publish jurisdiction-specific terms reviewed by qualified counsel.'})),
  'privacy-policy': ['General information','About us','Categories of data','Purposes of processing','Data sources','Disclosure of information','International transfers','Data retention','Consent and your rights','Automated decision making','Data security','Policy changes','Contact information'].map((title,index)=>({title:`${index+1}. ${title}`,body:'This frontend demo does not send form data to a server. A production privacy policy must accurately describe the operator, processors, retention periods, legal bases, and user rights.'})),
  'cookie-policy': [{title:'How cookies are used',body:'This recreation uses local storage only to remember whether the cookie notice was dismissed. It includes no analytics or advertising trackers.'},{title:'Managing preferences',body:'Clear site data in your browser to restore the notice and remove the saved preference.'}],
  complaints: [{title:'How to contact us',body:'Use the Support page to prepare a message. The educational form does not send data; a production service would provide a tracked complaints process.'},{title:'What to include',body:'Describe the issue, relevant dates, and the outcome you are requesting. Avoid sending passwords or payment credentials.'}],
  'aml-policy': [{title:'Purpose',body:'A production operator should maintain risk-based controls intended to prevent money laundering and terrorist financing.'},{title:'Verification and monitoring',body:'Appropriate identity checks, transaction monitoring, record retention, and regulatory reporting must follow applicable law.'}],
  'bonus-terms-and-conditions': [{title:'Bonus eligibility',body:'Promotions shown in this educational recreation are visual examples and cannot be claimed.'},{title:'Wagering and expiry',body:'A production promotion must state eligibility, wagering, expiry, excluded games, maximum stakes, and withdrawal conditions clearly.'}],
};
