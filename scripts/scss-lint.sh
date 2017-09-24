# ** THIS CANNOT BE EXECUTED IN NOT MAC (OS X) **
# Mac OS X SourceTree cannot read system configuration related to $PATH, ~/.bash_profile, ~/.zshrc.
# So, force to execute scss-lint (ruby modules) CLI with absolute path.

$HOME/.rbenv/shims/scss-lint $@
