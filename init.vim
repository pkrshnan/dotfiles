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
Plug 'numirias/semshi', {'do': ':UpdateRemotePlugins'}
Plug 'vimwiki/vimwiki'
Plug 'chrisbra/csv.vim'
Plug 'dense-analysis/ale'
Plug 'Shougo/deoplete.nvim', { 'do': ':UpdateRemotePlugins' }
Plug 'deoplete-plugins/deoplete-jedi'
Plug 'Shougo/deoplete-clangx'

call plug#end()

filetype plugin indent on

" Highlight the line on which the cursor lives.
set nocursorline

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
  set t_Co=16
endif

set wildmenu

" Theming
syntax on
colorscheme lena
set fillchars=vert::
highlight Comment cterm=italic

" Ease of Use
set number
set tabstop=2 
set shiftwidth=2 
set expandtab
set hlsearch
 
"Functionality
au BufRead,BufNewFile *.vue set ft=html

" Clipboard
function! ClipboardYank()
  call system('xclip -i -selection clipboard', @@)
endfunction
function! ClipboardPaste()
  let @@ = system('xclip -o -selection clipboard')
endfunction

vnoremap <silent> y y:call ClipboardYank()<cr>
vnoremap <silent> d d:call ClipboardYank()<cr>
nnoremap <silent> p :call ClipboardPaste()<cr>p

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

" Deoplete
let g:deoplete#enable_at_startup = 1
inoremap <expr><TAB>  pumvisible() ? "\<C-n>" : "\<TAB>"

" Mapping
map <F2> :set paste<CR>i   
map <F3> :set nopaste<CR>
map <C-p> :Files<CR>
map <C-g> :Goyo 80%x80%<CR>
map <C-i> gg=G<C-o><C-o>

let mapleader = ","
map <leader>s :Ag<CR>
map <CR> :Buffers<CR>
imap <expr> <C-tab> emmet#expandAbbrIntelligent("\<C-tab>")
map <F9> :NERDTreeToggle<CR>

" source ~/.config/nvim/statusline.vim

