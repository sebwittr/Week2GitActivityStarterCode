# Git Activity:
-------------

In this class activity, we will practice the use of git in a group setting, and
explore the following:
  - making changes to a sample project 
  - staging changes
  - commiting changes to your local repository
  - creating Pull Requests and asking a team member to review your changes
  - merging Pull Requests
  - reconciling divergent branches of development using "merge"
  - reconciling divergent branches of development using "rebase"

We will do this activity in groups of 2 people. 
Each group should have at least one laptop computer.

## Preparation:
------------

  - the students will organize themselves into groups of 2, fork a repository that the group will use for this class activity. The instructions on how to fork a repository can be found here: https://docs.github.com/en/get-started/quickstart/fork-a-repo#forking-a-repository
    
  - the document assumes the name of the repository is "Week2GitActivityStarterCode". 
    Make sure you are in the correct fork "<your github username>/Week2GitActivityStarterCode" 
    when you clone the repo.

  - all group members should set up git before class and make sure that
    their git installation is working

  - The document refers to one member of the group as member A and the other as member B.

  - for several of the steps below, it is important that the steps of the
    instructions are followed in exact order as specified, to ensure that
    merge conflicts arise, so that you can practice resolving them.

  - the activity consists of three parts, which you can do in any order.
    However, it is recommended that you start with PART I, and then do
    at least one of PARTS II/III.

  - Record all the commands executed in each part.

  - Submit the commands from all 3 parts to gradescope.

-------------------------------------------------------------------------------------


## PART I: PULL REQUESTS
------------

The goal of this  part is to become familiar with creating, reviewing, and merging PRs.
  - Record all commands executed. 

### Step I.0 (to be performed by 1 individual in each group):
---------------------------------------------------------

  - Fork the repository "Week2GitActivityStarterCode" that can be found at 
    "https://github.com/SpitfireSatya/Week2GitActivityStarterCode"
  - Share the link to the forked repository with your teammate.


### Step I.1 (to be performed independently by each member):
---------------------------------------------------------

  - clone the forked repository
  - review the code in the src directory and determine what will be printed
    when you execute it
  - install dependencies: `npm install`
  - compile the project: `tsc`
  - run the code: `node dist/index.js` 
  - confirm that the expected output is produced

### Step I.2: (to be performed by member A):
-----------------------------------------

  - create a branch "subtract-operation":  `git branch subtract-operation`
  - switch to branch "subtract-operation": `git checkout subtract-operation`
  - edit the file src/calculator.ts and add a "subtract" function
  - edit the file src/index.ts and extend the code to perform a subtraction
    operation and print the result
  - compile the code and make sure that it behaves as expected
  - stage your changes: `git add src`
  - commit your changes: `git commit -m "add subtract operation"`
  - push changes to your branch: `git push --set-upstream origin subtract-operation`
  - access the repository on github and create a Pull Request
  - assign the PR to a member of member B
  - message/inform that person that they should review the PR

### Step I.3: (to be performed by member B):
-----------------------------------------

  - open the Pull Request on github.com
  - add a comment confirming that it looks good 

### Step I.4: (to be performed by member A):
-----------------------------------------

  - observe the comment that was entered by member B
  - merge the Pull Request

(Note that it is possible to configure your repository to *require* that each PR is
reviewed by another team member. For your team project, we encourage you to adopt
such a policy by specifying appropriate branch protection rules.)

-------------------------------------------------------------------------------------


## PART II: REBASING
------------

The goal of this part is to become familiar with rebasing operations. This is useful
in situations where commits occurred in the main branch after you started work in your branch, and you want to include those changes into your branch.
- Record all commands executed.

### Step II.1: (to be performed by member A):
----------------------------------------

  - switch to the main branch: `git checkout main`
  - create a branch "multiply-operation": `git branch multiply-operation`


### Step II.2 (to be performed by member B):
----------------------------------------

  - switch to the main branch: `git checkout main`
  - create a branch "divide-operation"


### Step II.3: (to be performed by member A):
-----------------------------------------

  - switch to branch multiply-operation: `git checkout multiply-operation`
  - make changes to calculator.ts to implement this operation
  - compile and run the code to make sure that the behavior is as expected
  - commit and push these changes: 
	```
  git add src 
	git commit -m "implement multiply operation"
	git push --set-upstream origin multiply-operation```
  - on GitHub, create a PR for branch multiply-operation and merge it yourself

### Step II.4 (to be performed by member B):
---------------------------------------

  - switch to branch "divide-operation": `git checkout divide-operation`
  - make changes to calculator.ts to implement this operation
  - compile and run the code to make sure that the behavior is as expected: `tsc`
  - commit these changes but ***DO NOT PUSH to the remote repo***
	 ```git add src
	 git commit -m "implement divide operation"```

### Step II.5 (to be performed by member B):
---------------------------------------

(At this point, your "divide-operation" branch should be missing the commits
that member A applied to main since your brach was created. We will
address that using the "rebase" operation)

  - switch to the main branch: `git checkout main`
  - pull the latest changes: `git pull`
  - switch back to the "divide-operation" branch: `git checkout divide-operation`
  - perform a rebase operation to get the latest changes from main: `git rebase main`
    you should be getting output that looks as follows:
```
Auto-merging src/calculator.ts
CONFLICT (content): Merge conflict in src/calculator.ts
Auto-merging src/index.ts
CONFLICT (content): Merge conflict in src/index.ts
error: could not apply 1ed12a8... implement divide
hint: Resolve all conflicts manually, mark them as resolved with
hint: "git add/rm <conflicted_files>", then run "git rebase --continue".
hint: You can instead skip this commit: run "git rebase --skip".
hint: To abort and get back to the state before "git rebase", run "git rebase --abort".
Could not apply 1ed12a8... implement divide
```

  - open the file "src/calculator.ts" containing the conflict in an editor;
    it should look like this:
```
export class Calculator {
  public add(x: number, y: number) : number {
    return x + y;
  }
<<<<<<< HEAD
  public multiply(x: number, y: number) : number {
    return x * y;
=======
  public divide(x: number, y: number) : number {
    return x / y;
>>>>>>> 1ed12a8 (implement divide)
  }
};

```
  - in this case, the conflict can be resolved by changing the file contents to
```
export class Calculator {
  public add(x: number, y: number) : number {
    return x + y;
  }
  public multiply(x: number, y: number) : number {
    return x * y;
  }
  public divide(x: number, y: number) : number {
    return x / y;
  }
};
```

  - similarly, you will need to edit the file "src/index.ts" to resolve
    the conflict in that file
  - inform git that the conflicts have been resolved:  
	`git add src/calculator.ts src/index.ts`
  - continue the rebase operation: `git rebase --continue`
  - at this point, you have incorporated all changes from main into the
    divide-operation branch. Now push your commits to the remote repository:
	`git push --set-upstream origin divide-operation`
  - in GitHub, open a PR for this change, and designate member A to review it

### Step II.6 (to be performed by member A):
---------------------------------------

  - review the PR and merge it
  - switch to branch main: `git checkout main`
  - pull the changes: `git pull`
  - compile: `tsc`
  - run the code: `node dist/index.js`
  - observe that the changes from both branches are now present

-------------------------------------------------------------------------------------


## PART III: MERGING
===============
The goal of this part is to become familiar with git merge operations. 
This is useful in situations where commits occurred in a feature branch that you would like to incorporate in the main branch after some changes occurred in both.
  - Record all commands executed.

### Step III.1 (to be performed by member B):
---------------------------------------

  - check out the main branch: `git checkout main`
  - create new branch "hello": `git branch hello`
  - switch to branch "hello": `git checkout hello`

### Step III.2 (to be performed by member A):
---------------------------------------

  - check out the main branch: `git checkout main`
  - edit the file src/index.ts and add "console.log('done.')" on the last line
  - compile and run the code to make sure that the behavior is as expected
  - stage the change: `git add src/index.ts`
  - commit the change: `git commit -m "print message when done"`
  - push the change directly to main: `git push`

### Step III.3 (to be performed by member B):
----------------------------------------

  - add a method "hello" to calculator.ts that prints "hello"
  - add a call to this method on the last line in index.ts
  - compile and run the code to make sure that the behavior is as expected
  - stage the changes: git add src/calculator.ts src/index.ts
  - commit the changes: `git commit -m "print hello message"`
  - push the changes directly to branch "hello":  `git push --set-upstream origin hello`

### Step III.4 (to be performed by member A):
----------------------------------------

  - get the latest changes: `git pull` 
    -(you should see a message that a new branch "hello" was added)
  - at this point, we have conflicting changes in the main and hello branches. This will be evident when you try merging then. 
  - start the merge of branch hello into branch main: `git merge origin/hello`
    This should produce output that looks as follows:
```
Auto-merging src/index.ts
CONFLICT (content): Merge conflict in src/index.ts
Automatic merge failed; fix conflicts and then commit the result.
```
  - as the message indicates, you need to edit the file src/index.ts to resolve the conflict
  - open this file in the editor, it should look as follows:

```
import { Calculator } from './calculator';

const calc = new Calculator();

const result_add = calc.add(20, 30); // change both values

console.log(`result_add = ${result_add}`);
<<<<<<< HEAD
console.log('done');
=======
calc.hello();

>>>>>>> origin/hello

```

  - edit the file to resolve the conflict by having the code print "hello" followed by "done".
  - after finishing your edits, compile and run the code to make sure it behaves as expected
  - indicate to git that you finished the merge by staging and committing the edited file:
```
    git add src/index.ts
    git commit -m "merge the changes"
```
  - push the changes to the remote repository: git push

### Step III.5 (to be performed by member B):
----------------------------------------

  - switch to main: `git checkout main`
  - pull the changes: `git pull`
  - compile and run the code, and confirm that the changes of both branches are present


## Submit all the commands to Gradescope
-----------------------------------------