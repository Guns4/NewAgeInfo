/**
 * Major World Events Database for Life Timeline
 * Covers Tech, Culture, and History.
 */

export interface TimelineEvent {
    year: number;
    title: string;
    category: 'Tech' | 'Culture' | 'History';
    description: string;
}

export const TIMELINE_EVENTS: TimelineEvent[] = [
    { year: 1980, title: 'Pac-Man Released', category: 'Culture', description: 'Namco releases Pac-Man, becoming a pop culture icon.' },
    { year: 1981, title: 'First Space Shuttle', category: 'Tech', description: 'NASA launches Columbia, the first reusable spacecraft.' },
    { year: 1983, title: 'Internet Born', category: 'Tech', description: 'ARPANET officially switches to TCP/IP.' },
    { year: 1985, title: 'Windows 1.0', category: 'Tech', description: 'Microsoft releases its first graphical operating system.' },
    { year: 1989, title: 'Berlin Wall Falls', category: 'History', description: 'The symbol of the Cold War crumbles.' },
    { year: 1990, title: 'World Wide Web', category: 'Tech', description: 'Tim Berners-Lee publishes the first web page.' },
    { year: 1994, title: 'Amazon Founded', category: 'Tech', description: 'Jeff Bezos starts an online bookstore.' },
    { year: 1997, title: 'Harry Potter', category: 'Culture', description: 'The Philosopher\'s Stone is published.' },
    { year: 1998, title: 'Google Founded', category: 'Tech', description: 'Larry Page and Sergey Brin incorporate Google.' },
    { year: 2001, title: 'Wikipedia Launched', category: 'Tech', description: 'The free encyclopedia that anyone can edit goes live.' },
    { year: 2004, title: 'Facebook', category: 'Tech', description: 'The social network launches at Harvard.' },
    { year: 2007, title: 'iPhone Released', category: 'Tech', description: 'Steve Jobs introduces the first iPhone.' },
    { year: 2008, title: 'Financial Crisis', category: 'History', description: 'Global markets crash; Lehman Brothers collapses.' },
    { year: 2009, title: 'Bitcoin Created', category: 'Tech', description: 'Satoshi Nakamoto mines the genesis block.' },
    { year: 2010, title: 'Instagram', category: 'Culture', description: 'Photo sharing goes mobile.' },
    { year: 2012, title: 'Curiosity on Mars', category: 'Tech', description: 'NASA rover lands on the Red Planet.' },
    { year: 2016, title: 'TikTok Era', category: 'Culture', description: 'ByteDance launches Douyin/TikTok.' },
    { year: 2020, title: 'Global Pandemic', category: 'History', description: 'COVID-19 changes the world.' },
    { year: 2022, title: 'AI Boom', category: 'Tech', description: 'ChatGPT captures public imagination.' },
    { year: 2024, title: 'Apple Vision Pro', category: 'Tech', description: 'Spatial computing enters the consumer market.' },
];
