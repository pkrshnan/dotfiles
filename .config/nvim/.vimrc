call plug#begin()

Plug 'mattn/emmet-vim'
Plug 'junegunn/fzf', { 'dir': '~/.fzf', 'do': './install --all' }
Plug 'junegunn/fzf.vim'
Plug 'jiangmiao/auto-pairs'
Plug 'lervag/vimtex'
Plug 'junegunn/goyo.vim'
Plug 'tpope/vim-surround'
Plug 'tpope/vim-commentary'
Plug 'ryanoasis/vim-devicons'
Plug 'sheerun/vim-polyglot'
Plug 'tweekmonster/django-plus.vim'
Plug 'wlangstroth/vim-racket'
Plug 'dylanaraps/wal.vim'
Plug 'itchyny/lightline.vim'
Plug 'scrooloose/nerdtree'


call plug#end()
filetype plugin indent on

" Theming
syntax on
set noshowmode
colorscheme wal
hi VertSplit cterm=NONE
 
let g:lightline = { 'colorscheme': 'wal'} 
let g:lightline.mode_map = {
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
    \ }
 
" Ease of Use
set number
set tabstop=2 
set shiftwidth=2 
set expandtab
set hlsearch
 
"Functionality
au BufRead,BufNewFile *.vue set ft=html

" Mapping
map <F2> :set paste<CR>i   
map <F3> :set nopaste<CR>
map <C-p> :Files<CR>
map <C-g> :Goyo 80%x80%<CR>
map <C-i> gg=G<C-o><C-o>

let g:user_emmet_expandabbr_key = '<Tab>'
imap <expr> <tab> emmet#expandAbbrIntelligent("\<tab>")

inoremap <expr> <Tab> pumvisible() ? "\<C-n>" : "\<Tab>"
inoremap <expr> <S-Tab> pumvisible() ? "\<C-p>" : "\<S-Tab>"
 
map <F9> :NERDTreeToggle<CR>

