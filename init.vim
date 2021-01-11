call plug#begin()

Plug 'mattn/emmet-vim'
Plug 'junegunn/fzf', { 'dir': '~/.fzf', 'do': './install --all' }
Plug 'junegunn/fzf.vim'
Plug 'jiangmiao/auto-pairs'
Plug 'junegunn/goyo.vim'
Plug 'tpope/vim-surround'
Plug 'tpope/vim-commentary'
Plug 'ryanoasis/vim-devicons'
Plug 'sheerun/vim-polyglot'
Plug 'dylanaraps/wal.vim'
Plug 'scrooloose/nerdtree'
Plug 'dracula/vim'
Plug 'christoomey/vim-tmux-navigator'
Plug 'tpope/vim-fugitive'
Plug 'mileszs/ack.vim'
Plug 'vimwiki/vimwiki'
Plug 'chrisbra/csv.vim'
Plug 'dense-analysis/ale'
Plug 'arcticicestudio/nord-vim'
Plug 'Shougo/deoplete.nvim', { 'do': ':UpdateRemotePlugins' }
Plug 'HerringtonDarkholme/yats.vim'
Plug 'mhartington/nvim-typescript', {'do': './install.sh'}
Plug 'takkii/Bignyanco'
Plug 'itchyny/lightline.vim'
Plug 'maximbaz/lightline-ale'
Plug 'mengelbrecht/lightline-bufferline'
Plug 'tweekmonster/django-plus.vim'
Plug 'drewtempelmeyer/palenight.vim'
Plug 'tpope/vim-sensible'
Plug 'tpope/vim-endwise'
Plug 'burnettk/vim-angular'
Plug 'autozimu/LanguageClient-neovim', {
    \ 'branch': 'next',
    \ 'do': 'bash install.sh',
    \ }
Plug 'tpope/vim-rails'
Plug 'thoughtbot/vim-rspec'
Plug 'preservim/tagbar'
Plug 'vim-test/vim-test'
Plug 'kaicataldo/material.vim', { 'branch': 'main' }
Plug 'morhetz/gruvbox'

call plug#end()

filetype plugin indent on

" Highlight the line on which the cursor lives.
set nocursorline

" Set leader key to ','
let mapleader = ","

" Set cursor to be underline in normal mode
set guicursor+=n:hor20-Cursor/lCursor

" Always show at least one line above/below the cursor.
set scrolloff=1

" Always show at least one line left/right of the cursor.
set sidescrolloff=5

" Highlight matching pairs of brackets. Use the '%' character to jump between them.
set matchpairs+=<:>

" Display different types of white spaces.
set list
set listchars=tab:›\ ,trail:•,extends:#,nbsp:.

" Use system clipboard
set clipboard=unnamedplus

" Remove timeout for partially typed commands
set notimeout

"set smartindent
set autoindent

"set cindent
set nocompatible
filetype plugin indent on

" Allow switching between buffers without saving
set hidden

" If lightline/airline is enabled, don't show mode under it
set noshowmode

" Shell
set shell=/bin/zsh

" Allow color schemes to do bright colors without forcing bold.
if &t_Co == 8 && $TERM !~# '^linux\|^Eterm'
  set t_Co=256
endif

set wildmenu

" Set splits to be right and below respectively
set splitright
set splitbelow

" Theming
syntax on
set fillchars=vert::
highlight Comment cterm=italic

" match colorscheme to terminal bg
highlight clear LineNr
autocmd ColorScheme * highlight! Normal ctermbg=NONE guibg=NONE
set termguicolors


set background=dark
colorscheme gruvbox

" Ease of Use
set tabstop=2
set number
autocmd Filetype ts setlocal tabstop=4
set shiftwidth=2
set expandtab
set hlsearch

" Lighline
set showtabline=2
nmap <Leader>1 <Plug>lightline#bufferline#go(1)
nmap <Leader>2 <Plug>lightline#bufferline#go(2)
nmap <Leader>3 <Plug>lightline#bufferline#go(3)
nmap <Leader>4 <Plug>lightline#bufferline#go(4)
nmap <Leader>5 <Plug>lightline#bufferline#go(5)
nmap <Leader>6 <Plug>lightline#bufferline#go(6)
nmap <Leader>7 <Plug>lightline#bufferline#go(7)
nmap <Leader>8 <Plug>lightline#bufferline#go(8)
nmap <Leader>9 <Plug>lightline#bufferline#go(9)
nmap <Leader>0 <Plug>lightline#bufferline#go(10)
let g:lightline#bufferline#show_number  = 2
let g:lightline#bufferline#shorten_path = 1
let g:lightline = {
      \ 'tabline': {
      \   'left': [ ['buffers'] ],
      \ },
      \ 'active': {
      \   'left': [ [ 'mode', 'paste' ],
      \             [ 'gitbranch', 'readonly', 'filename', 'modified'] ],
      \   'right': [ [ 'linter_checking', 'linter_errors', 'linter_warnings', 'linter_ok' ], [ 'percent', 'lineinfo' ], [ 'fileformat', 'fileencoding', 'filetype' ] ]
      \ },
      \ 'component_expand': {
      \  'linter_checking': 'lightline#ale#checking',
      \  'linter_warnings': 'lightline#ale#warnings',
      \  'linter_errors': 'lightline#ale#errors',
      \  'linter_ok': 'lightline#ale#ok',
      \  'buffers': 'lightline#bufferline#buffers'
      \ },
      \ 'component_type': {
      \     'linter_checking': 'left',
      \     'linter_warnings': 'warning',
      \     'linter_errors': 'error',
      \     'linter_ok': 'left',
      \     'buffers': 'tabsel'
      \ },
      \ 'component_function': {
      \   'gitbranch': 'fugitive#head'
      \ },
      \ 'colorscheme': 'gruvbox',
      \ 'mode_map': {
      \   'n'      : ' N ',
      \   'i'      : ' I ',
      \   'R'      : ' R ',
      \   'v'      : ' V ',
      \   'V'      : 'V-L',
      \   'c'      : ' C ',
      \   "\<C-v>" : 'V-B',
      \   's'      : ' S ',
      \   'S'      : 'S-L',
      \   "\<C-s>" : 'S-B',
      \   "t"      : ' T ',
      \   '?'      : ' ? '
      \ },
      \ }

" Make vim buffer equal clipboard
function! ClipboardYank()
  call system('xclip -i -selection clipboard', @@)
endfunction
function! ClipboardPaste()
  let @@ = system('xclip -o -selection clipboard')
endfunction

vnoremap <silent> y y:call ClipboardYank()<cr>
vnoremap <silent> d d:call ClipboardYank()<cr>
nnoremap <silent> p :call ClipboardPaste()<cr>p

" Ale
let g:ale_completion_enabled = 1
let g:ale_set_highlights = 1

"Ack
if executable('ag')
  let g:ackprg = 'ag --vimgrep'
endif

"CSV
let g:csv_delim=','

"Latex
autocmd FileType latex,tex,md,markdown setlocal spell
set spelllang=en_us
inoremap <C-l> <c-g>u<Esc>[s1z=`]a<c-g>u

" Lang Server
" Required for operations modifying multiple buffers like rename.
set hidden

let g:LanguageClient_serverCommands = {
    \ 'ruby': ['~/.rbenv/shims/solargraph', 'stdio'],
    \ }

" note that if you are using Plug mapping you should not use `noremap` mappings.
nmap <F5> <Plug>(lcn-menu)
" Or map each action separately
nmap <silent>K <Plug>(lcn-hover)
nmap <silent> gd <Plug>(lcn-definition)
nmap <silent> <F2> <Plug>(lcn-rename)

" Deoplete
let g:deoplete#enable_at_startup = 1
inoremap <silent><expr> <TAB>
      \ pumvisible() ? "\<C-n>" :
      \ <SID>check_back_space() ? "\<TAB>" :
      \ deoplete#mappings#manual_complete()
function! s:check_back_space() abort "{{{
  let col = col('.') - 1
  return !col || getline('.')[col - 1]  =~ '\s'
endfunction"}}}

" Mapping
map <F2> :set paste<CR>i
map <F3> :set nopaste<CR>
map <C-p> :Files<CR>
map <C-g> :Goyo 80%x80%<CR>
map <C-i> gg=G<C-o><C-o>
map <C-d> :bdelete<CR>

let mapleader = ","
map <CR> :Buffers<CR>
imap <expr> <C-o> emmet#expandAbbrIntelligent("\<C-o>")
map <C-f> :NERDTreeToggle<CR>
map <leader>f :NERDTreeFind<CR>
map <C-t> :TagbarToggle<CR>

" Customize fzf colors to match your color scheme
let g:fzf_colors =
  \ { 'fg':      ['fg', 'Normal'],
  \ 'bg':      ['bg', 'Normal'],
  \ 'hl':      ['fg', 'Comment'],
  \ 'fg+':     ['fg', 'CursorLine', 'CursorColumn', 'Normal'],
  \ 'bg+':     ['bg', 'CursorLine', 'CursorColumn'],
  \ 'hl+':     ['fg', 'Statement'],
  \ 'info':    ['fg', 'PreProc'],
  \ 'prompt':  ['fg', 'Conditional'],
  \ 'pointer': ['fg', 'Exception'],
  \ 'marker':  ['fg', 'Keyword'],
  \ 'spinner': ['fg', 'Label'],
  \ 'header':  ['fg', 'Comment'] }

" Preview of file search with Ripgrep
map <leader>s :Rg<CR>
command! -bang -nargs=? -complete=dir Files
    \ call fzf#vim#files(<q-args>, fzf#vim#with_preview(), <bang>0)

" Preview of fuzzy finding with Ripgrep
command! -bang -nargs=* Rg
  \ call fzf#vim#grep(
  \   'rg --column --line-number --no-heading --color=always --smart-case '.shellescape(<q-args>), 1,
  \   fzf#vim#with_preview(), <bang>0)

" Trim trailing spaces
nnoremap <F5> :let _s=@/<Bar>:%s/\s\+$//e<Bar>:let @/=_s<Bar><CR>

" Folding
set foldmethod=indent
set nofoldenable

" Rspec
let test#strategy = "neovim"

