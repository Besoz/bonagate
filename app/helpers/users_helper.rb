module UsersHelper
  def active_class tab
    @tab == tab ? 'active' : ''
  end
end
