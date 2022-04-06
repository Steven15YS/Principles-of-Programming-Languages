import * as R from "ramda";

const stringToArray = R.split("");

/* Question 1 */
export const countLetters: (s: string) => {} = (s: string) => 
     R.countBy(R.toLower)((stringToArray(s)).filter((x: string) => /[a-zA-Z]/.test(x)));

/* Question 2 */
export const isPaired: (s: string) => boolean = (s: string) =>
     stackSim(s).length === 0 ? true : false;

const openers: string[] = ['[', '{', '('];
const closers: string[] = [']', '}', ')'];

const filterParentheses: (str: string) => string[] = (str: string) => 
     R.filter((char: string) => (openers.includes(char) || closers.includes(char)), stringToArray(str));

const matchingParentheses: (opener: string, closer: string) => boolean = (opener: string, closer: string) => 
     opener === 'err' ? false : ((opener === '(' && closer === ')') || (opener === '{' && closer === '}') || (opener === '[' && closer === ']') ? true : false);

const stackSim: (s: string) => string[] = (s: string) =>
     R.reduce((acc: string[], curr: string) => 
          (openers.includes(curr)) ? R.concat(acc, [curr]) 
          : (acc.length === 0) ? ['err']
          : matchingParentheses(acc[acc.length - 1], curr) ? R.slice(0, acc.length - 1, acc) : ['err'], [], filterParentheses(s));

// /* Question 3 */
export interface WordTree {
    root: string;
    children: WordTree[];
}

export const treeToSentence = (t: WordTree): string =>
     t.children.length == 0 ? t.root : t.root + R.reduce((acc,curr) => acc + ' ' + treeToSentence(curr), '', t.children);  
 